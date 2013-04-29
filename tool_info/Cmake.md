# 명령어
## CMake -----------------------------------------------------------------------
cmake --help
cmake --help-full
cmake --help-command-list
cmake --help-command 커맨드

프로젝트구성 : cmake -G"Visual Studio 9 2008" -H"./" -B"./Build/"
빌드 : cmake --build ./Build ;; devenv test.sln /Build Debug와 같은 효과

## CTest -----------------------------------------------------------------------
ctest
 ctest -I 3,5 // 3/13 4/13 5/13를 테스트
 ctest -I ,,3 // 1/13 4/13 7/13 10/13 13/13를 테스트
 
## CPack -----------------------------------------------------------------------
nsis로 패키징됨


# links ------------------------------------------------------------------------
http://www.cmake.org/cmake/help/cmake_tutorial.html
http://www-flc.desy.de/ldcoptimization/documents/talks/CMake_Tutorial.pdf
http://www.elpauer.org/stuff/learning_cmake.pdf


http://www.cmake.org/Wiki/CMake_Useful_Variables
CMAKE_MODULE_PATH    : Path to where the CMake modules are located
CMAKE_INSTALL_PREFIX : Where to put files when calling 'make install'
CMAKE_BUILD_TYPE     : Type of build (Debug, Release, ...)
BUILD_SHARED_LIBS    : Switch between shared and static libraries
CMAKE_CFG_INTDIR 

# 매크로  ----------------------------------------------------------------------
# 함수 존제 여부 판별
include (${CMAKE_ROOT}/Modules/CheckFunctionExists.cmake)
check_function_exists (log HAVE_LOG)
check_function_exists (exp HAVE_EXP)

# 프로젝트에 현재 플렛폼에 맞는 런타임 라이브러리를 포함시킴.
include (InstallRequiredSystemLibraries)

# 인스톨러
include (CPack)
바이너리 : cpack -C CPackConfig.cmake
소스     : cpack -C CPackSourceConfig.cmake

# 테스트
include (CTest)
macro (do_test arg result)
  add_test (TutorialComp${arg} Tutorial ${arg})
  set_tests_properties (TutorialComp${arg}
    PROPERTIES PASS_REGULAR_EXPRESSION ${result}
    )
endmacro (do_test)
do_test (4 "4 is 2")

# 변수할당 ---------------------------------------------------------------------
set(Foo a b c)
command(${Foo}) == command(a b c)
command("${Foo}") == command( "a b c" )
MATH( EXPR x "3 + 3" ) # stores the result of 3 + 3 in x

# 조건문 -----------------------------------------------------------------------
if // endif
foreach // endforeach
macro // endmacro


option (옵션변수 주석 ON/OFF)
configure_file (변환전파일 변환후파일)
# 변환 전 파일 내용 : #define Tutorial_VERSION_MAJOR @Tutorial_VERSION_MAJOR@
# 변환 후 파일 내용 : #define Tutorial_VERSION_MAJOR 1
# #cmakedefine VAR는 CMake에 VAR의 setting값에 따라 #define VAR나 /* #undef VAR */로 바뀜.
 
 
//-------------------------------------------------------
install (TARGETS my_sqrt DESTINATION bin)
install (FILES my_sqrt.h DESTINATION include)
//----------------------
install(TARGETS targets... [EXPORT <export-name>]
        [[ARCHIVE|LIBRARY|RUNTIME|FRAMEWORK|BUNDLE|
          PRIVATE_HEADER|PUBLIC_HEADER|RESOURCE]
         [DESTINATION <dir>]
         [PERMISSIONS permissions...]
         [CONFIGURATIONS [Debug|Release|...]]
         [COMPONENT <component>]
         [OPTIONAL] [NAMELINK_ONLY|NAMELINK_SKIP]
        ] [...])

install(FILES files... DESTINATION <dir>
        [PERMISSIONS permissions...]
        [CONFIGURATIONS [Debug|Release|...]]
        [COMPONENT <component>]
        [RENAME <name>] [OPTIONAL])

install(PROGRAMS files... DESTINATION <dir>
        [PERMISSIONS permissions...]
        [CONFIGURATIONS [Debug|Release|...]]
        [COMPONENT <component>]
        [RENAME <name>] [OPTIONAL])
		
install(DIRECTORY dirs... DESTINATION <dir>
        [FILE_PERMISSIONS permissions...]
        [DIRECTORY_PERMISSIONS permissions...]
        [USE_SOURCE_PERMISSIONS]
        [CONFIGURATIONS [Debug|Release|...]]
        [COMPONENT <component>] [FILES_MATCHING]
        [[PATTERN <pattern> | REGEX <regex>]
         [EXCLUDE] [PERMISSIONS permissions...]] [...])
		 
install(EXPORT <export-name> DESTINATION <dir>
        [NAMESPACE <namespace>] [FILE <name>.cmake]
        [PERMISSIONS permissions...]
        [CONFIGURATIONS [Debug|Release|...]]
        [COMPONENT <component>])
//-------------------------------------------------------
find_package(...)
//-------------------------------------------------------
Ex)

cmake_minimum_required (VERSION 최소버전)
project (솔루션명)

add_executable (실행파일 소스)

// ${PROJECT_SOURCE_DIR} : 프로젝트 소스 디렉토리
// ${CMAKE_CURRENT_BINARY_DIR} : 현재 CMakeLists.txt파일이 있는 디렉토리
include_directories (인클루드_디렉토리명)

add_subdirectory (CMakeLists.txt파일이_들어있는_디렉토리)
target_link_libraries (실행파일 추가시킬라이브러리)

add_library(타겟 소스) # 소스에 대한 헤더파일도 폴더에 있어야 함

option (옵션변수 코맨트 ON/OFF)
configure_file (변환_전_설정파일 변환_후_파일)
  
include (CMake패키지명)


# CTest
include (CTest)
add_test (testHello my_test)
set_tests_properties (testHello
    PROPERTIES PASS_REGULAR_EXPRESSION "4"
)

# Nsis 패키징
include (CPack)
