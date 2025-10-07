import fs from 'node:fs';
import path from 'node:path';
import { config } from 'dotenv';
import {
  downloadFromOracle,
  listObjectsFromOracle,
} from '@/lib/oracleStorage';

// 환경 변수 로드
config({ path: '.env.local' });

const contentDirectory = path.join(process.cwd(), 'content');

/**
 * Oracle Bucket에서 파일을 다운로드하여 로컬에 저장
 */
async function downloadAndSaveFile(
  objectName: string,
  localPath: string,
): Promise<void> {
  try {
    // Oracle Bucket에서 파일 다운로드
    const fileContents = await downloadFromOracle(objectName);

    // 디렉토리가 없으면 생성
    const dirPath = path.dirname(localPath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // 파일 저장
    fs.writeFileSync(localPath, fileContents, 'utf-8');
    console.log(`✅ Downloaded: ${objectName} → ${localPath}`);
  } catch (error) {
    console.error(`❌ Failed to download ${objectName}:`, error);
    throw error;
  }
}

/**
 * 특정 prefix의 모든 파일 다운로드
 */
async function downloadByPrefix(prefix: string): Promise<number> {
  console.log(`\n📥 Downloading files with prefix: ${prefix}`);

  // Oracle Bucket에서 파일 목록 조회
  const objectNames = await listObjectsFromOracle(prefix);

  if (objectNames.length === 0) {
    console.log(`   ℹ️  No files found with prefix: ${prefix}`);
    return 0;
  }

  console.log(`   Found ${objectNames.length} files`);

  let successCount = 0;
  for (const objectName of objectNames) {
    try {
      // objectName 예: "blog/frontend/example.mdx" → content/blog/frontend/example.mdx
      const localPath = path.join(contentDirectory, objectName);
      await downloadAndSaveFile(objectName, localPath);
      successCount++;
    } catch (error) {
      console.error(`   Failed to download ${objectName}`);
    }
  }

  return successCount;
}

/**
 * 모든 콘텐츠 다운로드 (blog, announcement, log)
 */
async function downloadAllFromOracle(): Promise<void> {
  console.log('🚀 Starting download from Oracle Bucket...\n');

  const prefixes = ['blog/', 'announcement/', 'log/'];
  let totalDownloaded = 0;

  for (const prefix of prefixes) {
    const count = await downloadByPrefix(prefix);
    totalDownloaded += count;
  }

  console.log('\n✅ Download completed!');
  console.log(`📊 Total files downloaded: ${totalDownloaded}`);
}

/**
 * 특정 카테고리의 파일만 다운로드
 */
async function downloadCategoryFromOracle(category: string): Promise<void> {
  console.log(
    `🚀 Downloading files from category: ${category} in Oracle Bucket...\n`,
  );

  const prefix = `blog/${category}/`;
  const count = await downloadByPrefix(prefix);

  console.log('\n✅ Download completed!');
  console.log(`📊 Total files downloaded: ${count}`);
}

/**
 * 특정 파일만 다운로드
 */
async function downloadSingleFile(
  category: string,
  filename: string,
): Promise<void> {
  console.log(`🚀 Downloading single file: ${category}/${filename}...\n`);

  const objectName = `blog/${category}/${filename}`;
  const localPath = path.join(contentDirectory, objectName);

  await downloadAndSaveFile(objectName, localPath);

  console.log('\n✅ Download completed!');
}

/**
 * CLI 진입점
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
Usage:
  pnpm download:oracle all                          - Download all files
  pnpm download:oracle category <category>          - Download specific category
  pnpm download:oracle file <category> <filename>   - Download single file

Examples:
  pnpm download:oracle all
  pnpm download:oracle category frontend
  pnpm download:oracle file frontend example.mdx
    `);
    process.exit(1);
  }

  const command = args[0];

  try {
    switch (command) {
      case 'all':
        await downloadAllFromOracle();
        break;

      case 'category': {
        if (args.length < 2) {
          console.error('❌ Error: Category name is required');
          console.log('Usage: pnpm download:oracle category <category>');
          process.exit(1);
        }
        const category = args[1];
        await downloadCategoryFromOracle(category);
        break;
      }

      case 'file': {
        if (args.length < 3) {
          console.error('❌ Error: Category and filename are required');
          console.log(
            'Usage: pnpm download:oracle file <category> <filename>',
          );
          process.exit(1);
        }
        const category = args[1];
        const filename = args[2];
        await downloadSingleFile(category, filename);
        break;
      }

      default:
        console.error(`❌ Error: Unknown command "${command}"`);
        console.log(
          'Available commands: all, category <category>, file <category> <filename>',
        );
        process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Download failed:', error);
    process.exit(1);
  }
}

main();
