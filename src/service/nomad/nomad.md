# Nomad

- https://developer.hashicorp.com/nomad
- https://github.com/hashicorp/nomad


https://developer.hashicorp.com/nomad/tutorials/web-ui/web-ui-access


nomad ui redis-job 
http://127.0.0.1:4646/ui/jobs/redis-job


nomad agent -dev
http://127.0.0.1:4646/ui/jobs


raw-exec 는 따로 설치 하지 않아도 됨


nomad version
nomad -v

nomad agent -config=nomad-config.hcl
nomad job run job-dir.nomad
 

HCL Hashicorp Configuration Language  https://developer.hashicorp.com/nomad/docs/job-specification/hcl2

https://developer.hashicorp.com/nomad/docs/configuration


``` hcl

# 싱글라인 코멘트
// 싱글라인 코멘트
/* 멀티라인 코멘트 */

datacenter = "dc1"
data_dir   = "data"        # 절대경로
bind_addr  = "0.0.0.0"

server {
  enabled          = true
  bootstrap_expect = 1     # 부트스트래핑 전에 기다릴 서버 노드 수를 지정
}

client {
  enabled           = true
}
```
