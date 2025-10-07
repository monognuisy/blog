import fs from 'node:fs';
import path from 'node:path';
import { config } from 'dotenv';
import matter from 'gray-matter';
import { uploadToOracle, getPublicUrl } from '@/lib/oracleStorage';

// 환경 변수 로드
config({ path: '.env.local' });

const contentDirectory = path.join(process.cwd(), 'content');
const blogDirectory = path.join(contentDirectory, 'blog');
const announcementDirectory = path.join(contentDirectory, 'announcement');
const logDirectory = path.join(contentDirectory, 'log');

/**
 * 디렉토리 내 모든 MDX 파일 재귀적으로 수집
 */
function getAllMdxFiles(dir: string, baseDir: string = dir): string[] {
  const files: string[] = [];

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // 재귀적으로 하위 디렉토리 탐색
      files.push(...getAllMdxFiles(fullPath, baseDir));
    } else if (item.endsWith('.mdx') || item.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * content 폴더의 모든 파일을 Oracle Bucket의 /blog 경로에 업로드
 */
async function uploadContentToOracle() {
  console.log('📦 Starting migration to Oracle Object Storage...\n');

  // blog, announcement, log 디렉토리 처리
  const directories = [
    { path: blogDirectory, prefix: 'blog' },
    { path: announcementDirectory, prefix: 'announcement' },
    { path: logDirectory, prefix: 'log' },
  ];

  let totalUploaded = 0;

  for (const { path: dirPath, prefix } of directories) {
    if (!fs.existsSync(dirPath)) {
      console.log(`⚠️  Directory not found: ${dirPath}, skipping...`);
      continue;
    }

    console.log(`\n📁 Processing ${prefix} directory...`);

    const files = getAllMdxFiles(dirPath);

    for (const filePath of files) {
      // 상대 경로 계산 (content/ 기준)
      const relativePath = path.relative(contentDirectory, filePath);

      // Oracle 객체 이름: blog/category/filename.mdx
      const objectName = relativePath.replace(/\\/g, '/'); // Windows 경로 처리

      try {
        await uploadToOracle(objectName, filePath);
        totalUploaded++;

        // 파일 정보 출력
        const { data: frontmatter } = matter(fs.readFileSync(filePath, 'utf8'));
        console.log(`   📝 ${frontmatter.title || path.basename(filePath)}`);
        console.log(`   🔗 ${getPublicUrl(objectName)}`);
      } catch (error) {
        console.error(`❌ Failed to upload ${objectName}:`, error);
      }
    }
  }

  console.log(`\n✅ Migration completed!`);
  console.log(`📊 Total files uploaded: ${totalUploaded}`);
}

/**
 * 특정 카테고리만 업로드 (선택적)
 */
async function uploadCategory(category: string) {
  const categoryPath = path.join(blogDirectory, category);

  if (!fs.existsSync(categoryPath)) {
    console.error(`❌ Category not found: ${category}`);
    return;
  }

  const files = getAllMdxFiles(categoryPath);

  for (const filePath of files) {
    const relativePath = path.relative(contentDirectory, filePath);
    const objectName = relativePath.replace(/\\/g, '/');

    try {
      await uploadToOracle(objectName, filePath);
      console.log(`✅ Uploaded: ${objectName}`);
    } catch (error) {
      console.error(`❌ Failed to upload ${objectName}:`, error);
    }
  }
}

/**
 * 단일 파일 업로드 (테스트용)
 */
async function uploadSingleFile(category: string, fileName: string) {
  const filePath = path.join(blogDirectory, category, fileName);

  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    return;
  }

  const objectName = `blog/${category}/${fileName}`;

  try {
    await uploadToOracle(objectName, filePath);
    console.log(`✅ Uploaded: ${objectName}`);
    console.log(`🔗 Public URL: ${getPublicUrl(objectName)}`);
  } catch (error) {
    console.error(`❌ Failed to upload ${objectName}:`, error);
  }
}

// CLI 인터페이스
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  try {
    switch (command) {
      case 'all':
        await uploadContentToOracle();
        break;
      case 'category':
        if (!args[1]) {
          console.error('❌ Usage: npm run migrate:oracle category <category-name>');
          process.exit(1);
        }
        await uploadCategory(args[1]);
        break;
      case 'file':
        if (!args[1] || !args[2]) {
          console.error('❌ Usage: npm run migrate:oracle file <category> <filename>');
          process.exit(1);
        }
        await uploadSingleFile(args[1], args[2]);
        break;
      default:
        console.log('📖 Usage:');
        console.log('  npm run migrate:oracle all                    # Upload all files');
        console.log('  npm run migrate:oracle category <name>        # Upload specific category');
        console.log('  npm run migrate:oracle file <cat> <filename>  # Upload single file');
        break;
    }
  } catch (error) {
    console.error('💥 Migration failed:', error);
    process.exit(1);
  }
}

main();
