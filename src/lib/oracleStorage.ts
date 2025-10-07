import fs from 'node:fs';
import { common, objectstorage } from 'oci-sdk';

// OCI 인증 설정
const getAuthProvider = (): common.SimpleAuthenticationDetailsProvider => {
  // 환경 변수에서 private key를 직접 읽거나 파일 경로에서 읽음
  const privateKey = process.env.OCI_PRIVATE_KEY
    ? process.env.OCI_PRIVATE_KEY.replace(/\\n/g, '\n')
    : fs.readFileSync(process.env.OCI_PRIVATE_KEY_PATH!, 'utf-8');

  const provider = new common.SimpleAuthenticationDetailsProvider(
    process.env.OCI_TENANCY_ID!,
    process.env.OCI_USER_ID!,
    process.env.OCI_FINGERPRINT!,
    privateKey,
    null,
    common.Region.fromRegionId(process.env.OCI_REGION!),
  );

  return provider;
};

// Object Storage 클라이언트 생성
const getObjectStorageClient = () => {
  const provider = getAuthProvider();
  return new objectstorage.ObjectStorageClient({
    authenticationDetailsProvider: provider,
  });
};

// 환경 변수 가져오기 (함수 실행 시점에 평가)
const getNamespace = () => {
  const namespace = process.env.OCI_NAMESPACE;
  if (!namespace) {
    throw new Error('OCI_NAMESPACE environment variable is not set');
  }
  return namespace;
};

const getBucketName = () => {
  const bucketName = process.env.OCI_BUCKET_NAME;
  if (!bucketName) {
    throw new Error('OCI_BUCKET_NAME environment variable is not set');
  }
  return bucketName;
};

/**
 * Oracle Object Storage에 파일 업로드
 * @param objectName - 저장될 객체 이름 (예: "blog/frontend/example.mdx")
 * @param filePath - 업로드할 로컬 파일 경로
 */
export async function uploadToOracle(
  objectName: string,
  filePath: string,
): Promise<void> {
  const client = getObjectStorageClient();

  const fileContent = fs.readFileSync(filePath);

  const putObjectRequest: objectstorage.requests.PutObjectRequest = {
    namespaceName: getNamespace(),
    bucketName: getBucketName(),
    objectName: objectName,
    putObjectBody: fileContent,
    contentType: 'text/markdown',
  };

  await client.putObject(putObjectRequest);
  console.log(`✅ Uploaded: ${objectName}`);
}

/**
 * Oracle Object Storage에서 파일 다운로드
 * @param objectName - 객체 이름 (예: "blog/frontend/example.mdx")
 * @returns 파일 내용 (string)
 */
export async function downloadFromOracle(objectName: string): Promise<string> {
  const client = getObjectStorageClient();

  const getObjectRequest: objectstorage.requests.GetObjectRequest = {
    namespaceName: getNamespace(),
    bucketName: getBucketName(),
    objectName: objectName,
  };

  const response = await client.getObject(getObjectRequest);

  // Stream을 문자열로 변환
  // Note: response.value는 Readable Stream이지만 OCI SDK 타입 정의가 명확하지 않아 any 사용
  const chunks: Buffer[] = [];
  // biome-ignore lint/suspicious/noExplicitAny: OCI SDK response.value stream type is not well-defined
  for await (const chunk of response.value as any) {
    chunks.push(Buffer.from(chunk));
  }

  return Buffer.concat(chunks).toString('utf-8');
}

/**
 * Oracle Object Storage에서 특정 prefix의 모든 객체 목록 조회
 * @param prefix - 객체 이름 prefix (예: "blog/")
 * @returns 객체 이름 배열
 */
export async function listObjectsFromOracle(prefix: string): Promise<string[]> {
  const client = getObjectStorageClient();

  const listObjectsRequest: objectstorage.requests.ListObjectsRequest = {
    namespaceName: getNamespace(),
    bucketName: getBucketName(),
    prefix: prefix,
  };

  const response = await client.listObjects(listObjectsRequest);

  return (
    response.listObjects.objects?.map(
      (obj: objectstorage.models.ObjectSummary) => obj.name,
    ) || []
  );
}

/**
 * Oracle Object Storage에서 파일 삭제
 * @param objectName - 삭제할 객체 이름
 */
export async function deleteFromOracle(objectName: string): Promise<void> {
  const client = getObjectStorageClient();

  const deleteObjectRequest: objectstorage.requests.DeleteObjectRequest = {
    namespaceName: getNamespace(),
    bucketName: getBucketName(),
    objectName: objectName,
  };

  await client.deleteObject(deleteObjectRequest);
  console.log(`🗑️  Deleted: ${objectName}`);
}

/**
 * 공개 URL 생성 (PAR URL 사용)
 * @param objectName - 객체 이름
 * @returns 공개 접근 가능한 URL
 */
export function getPublicUrl(objectName: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BUCKET_ABOUT_PREFIX!;
  return `${baseUrl}/${encodeURIComponent(objectName)}`;
}
