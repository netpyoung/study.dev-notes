# S3

Amazon S3(`Amazon` `S`imple `S`torage `S`ervice)


## S3 ninja

- <https://s3ninja.net/>
    - <https://github.com/scireum/s3ninja>
    - <https://anthony-f-tannous.medium.com/emulating-aws-s3-d56ba9cdc72>
- 리전설정
  - <https://docs.aws.amazon.com/sdk-for-net/v3/developer-guide/net-dg-region-selection.html>

## MinIO

Min IO (Minimal Object Storage)

- <https://min.io/>
- <https://github.com/minio/minio/blob/master/docs/config/README.md>
- <https://min.io/docs/minio/windows/index.html>
  - <https://min.io/download?license=enterprise&platform=windows>
  - <https://dl.min.io/server/minio/release/windows-amd64/minio.exe>
  - `aria2c --max-connection-per-server=16 --split=16 --min-split-size=1M https://dl.min.io/server/minio/release/windows-amd64/minio.exe`

- http://127.0.0.1:9001/access-keys > Create Access Key

``` txt
MINIO_ROOT_USER
MINIO_ROOT_PASSWORD
MINIO_SITE_NAME     (string)    name for the site e.g. "cal-rack0"
MINIO_SITE_REGION   (string)    name of the location of the server e.g. "us-west-1"
MINIO_SITE_COMMENT  (sentence)  optionally add a comment to this setting
```


``` cs
Environment.SetEnvironmentVariable("MINIO_ROOT_USER", "minioadmin");     // default: minioadmin | at least 3
Environment.SetEnvironmentVariable("MINIO_ROOT_PASSWORD", "minioadmin"); // default: minioadmin | at least 8
ProcessStartInfo psi = new ProcessStartInfo
{
    FileName = "minio",
    Arguments = $"server {storageDir} --address :9000 --console-address :9001",
    UseShellExecute = false,
};
```

``` txt
bucket 설정

- http://127.0.0.1:9001/buckets > Create Bucket > bucket-a
- bucket-a > Anonymous > Add Access Rule > Prefix: * / Access: readonly
```


## 기타

- azurite
  - <https://github.com/azure/azurite>
  - <https://learn.microsoft.com/ko-kr/azure/storage/common/storage-use-emulator>
  - Azure 클라우드에 업/다운로드 5TB 초과시 CDN고려. 10TB부터 요금차이가 꽤 발생하기 시작함.
- <https://github.com/localstack/localstack>
  - 💻 A fully functional local AWS cloud stack. Develop and test your cloud & Serverless apps offline
- <https://github.com/projectdiscovery/simplehttpserver>
  - Go alternative of python SimpleHTTPServer
