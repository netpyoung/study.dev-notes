# ��ɾ�
## CMake -----------------------------------------------------------------------
cmake --help
cmake --help-full
cmake --help-command-list
cmake --help-command Ŀ�ǵ�

������Ʈ���� : cmake -G"Visual Studio 9 2008" -H"./" -B"./Build/"
���� : cmake --build ./Build ;; devenv test.sln /Build Debug�� ���� ȿ��

## CTest -----------------------------------------------------------------------
ctest
 ctest -I 3,5 // 3/13 4/13 5/13�� �׽�Ʈ
 ctest -I ,,3 // 1/13 4/13 7/13 10/13 13/13�� �׽�Ʈ
 
## CPack -----------------------------------------------------------------------
nsis�� ��Ű¡��


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

# ��ũ��  ----------------------------------------------------------------------
# �Լ� ���� ���� �Ǻ�
include (${CMAKE_ROOT}/Modules/CheckFunctionExists.cmake)
check_function_exists (log HAVE_LOG)
check_function_exists (exp HAVE_EXP)

# ������Ʈ�� ���� �÷����� �´� ��Ÿ�� ���̺귯���� ���Խ�Ŵ.
include (InstallRequiredSystemLibraries)

# �ν��緯
include (CPack)
���̳ʸ� : cpack -C CPackConfig.cmake
�ҽ�     : cpack -C CPackSourceConfig.cmake

# �׽�Ʈ
include (CTest)
macro (do_test arg result)
  add_test (TutorialComp${arg} Tutorial ${arg})
  set_tests_properties (TutorialComp${arg}
    PROPERTIES PASS_REGULAR_EXPRESSION ${result}
    )
endmacro (do_test)
do_test (4 "4 is 2")

# �����Ҵ� ---------------------------------------------------------------------
set(Foo a b c)
command(${Foo}) == command(a b c)
command("${Foo}") == command( "a b c" )
MATH( EXPR x "3 + 3" ) # stores the result of 3 + 3 in x

# ���ǹ� -----------------------------------------------------------------------
if // endif
foreach // endforeach
macro // endmacro


option (�ɼǺ��� �ּ� ON/OFF)
configure_file (��ȯ������ ��ȯ������)
# ��ȯ �� ���� ���� : #define Tutorial_VERSION_MAJOR @Tutorial_VERSION_MAJOR@
# ��ȯ �� ���� ���� : #define Tutorial_VERSION_MAJOR 1
# #cmakedefine VAR�� CMake�� VAR�� setting���� ���� #define VAR�� /* #undef VAR */�� �ٲ�.
 
 
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

cmake_minimum_required (VERSION �ּҹ���)
project (�ַ�Ǹ�)

add_executable (�������� �ҽ�)

// ${PROJECT_SOURCE_DIR} : ������Ʈ �ҽ� ���丮
// ${CMAKE_CURRENT_BINARY_DIR} : ���� CMakeLists.txt������ �ִ� ���丮
include_directories (��Ŭ���_���丮��)

add_subdirectory (CMakeLists.txt������_����ִ�_���丮)
target_link_libraries (�������� �߰���ų���̺귯��)

add_library(Ÿ�� �ҽ�) # �ҽ��� ���� ������ϵ� ������ �־�� ��

option (�ɼǺ��� �ڸ�Ʈ ON/OFF)
configure_file (��ȯ_��_�������� ��ȯ_��_����)
  
include (CMake��Ű����)


# CTest
include (CTest)
add_test (testHello my_test)
set_tests_properties (testHello
    PROPERTIES PASS_REGULAR_EXPRESSION "4"
)

# Nsis ��Ű¡
include (CPack)
