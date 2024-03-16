# Merge

## TortoiseGit

| p4merge | https://www.perforce.com/downloads/visual-merge-tool              |
| ------- | ----------------------------------------------------------------- |
| diff:   | C:\Program Files\Perforce\P4Merge.exe %base %mine                 |
| merge:  | C:\Program Files\Perforce\P4Merge.exe %base %theirs %mine %merged |

| winmerge | https://winmerge.org/                                                                                                           |
| -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| diff     | C:\Program Files\WinMerge\WinMergeU.exe -e -ub -dl %bname -dr %yname %base %mine                                                |
| merge    | C:\Program Files\WinMerge\WinMergeU.exe /e /ub /fm /wl /wr /dl %tname /dm %bname /dr %yname  %theirs %base %mine /o %merged /am |

| kdiff3 | https://github.com/KDE/kdiff3                                                                             |
| ------ | --------------------------------------------------------------------------------------------------------- |
| diff   | C:\Program Files\KDiff3\bin\kdiff3.exe %base %mine --L1 %bname --L2 %yname                                |
| merge  | C:\Program Files\KDiff3\bin\kdiff3.exe %base %mine %theirs -o %merged --L1 %bname --L2 %yname --L3 %tname |
