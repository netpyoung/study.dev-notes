# SignTool

- <https://learn.microsoft.com/en-us/windows/win32/seccrypto/signtool>

- .pfx 파일
  - <https://docs.microsoft.com/en-us/windows-hardware/drivers/install/personal-information-exchange---pfx--files>

``` txt
/f SignCertFile	Specifies the signing certificate in a file. If the file is in Personal Information Exchange (PFX) format and protected by a password, use the /p option to specify the password. If the file does not contain private keys, use the /csp and /kc options to specify the CSP and private key container name.
/p Password	Specifies the password to use when opening a PFX file. (Use the /f option to specify a PFX file.)
/n SubjectName	Specifies the name of the subject of the signing certificate. This value can be a substring of the entire subject name.
/d Desc	Specifies a description of the signed content.
/t URL	Specifies the URL of the time stamp server. If this option (or /tr) is not present, the signed file will not be time stamped. A warning is generated if time stamping fails. This option cannot be used with the /tr option.

/fd	Specifies the file digest algorithm to use for creating file signatures.
Note: An error is generated if the /fd switch is not provided while signing.
/fd certHash	Specifying the string certHash will default to the algorithm used on the signing certificate.
Note: An error is generated if the /fd switch is not provided while signing.
```

``` cmd
SignTool sign /n <SubjectName> /d <Desc> /fd SHA256 /f <SignCertFile.pfx> /p <Password> <File>
```

## Ref

- <https://docs.microsoft.com/en-us/dotnet/framework/tools/signtool-exe#sign-command-options>
- <https://docs.microsoft.com/en-us/windows/win32/seccrypto/using-signtool-to-sign-a-file>
- <https://docs.microsoft.com/en-us/windows/win32/seccrypto/using-signtool-to-verify-a-file-signature>
