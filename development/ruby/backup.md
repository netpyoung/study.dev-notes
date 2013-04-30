```ruby
class Adir
    def initialize(input)
        @input = (input.length == 0) ? '.' : input
        @total_file = 0
        @total_dir = 0
        @total_size = 0
    end
   
    def add_comma(intval)
        "int값에 3자리마다 ,(콤마)를 붙임"
        (intval < 1000) ? intval : intval.to_s.reverse.scan(/\d{1,3}/).join(',').reverse
    end

    def get_available_size
        "system(dir)로부터 사용 가능한바이트 반환(string)"
        %x[dir][/[\d,]* 바이트 남음/].chomp(" 바이트 남음")
    end   
   
    def print_file_info(file)
        begin
            if FileTest.directory?(file)
                type = "<DIR>"
                size =  '     '
                @total_dir += 1
            else
                type = "     "
                size = File.size(file)
                @total_file +=1
                @total_size += size
            end
            puts "#{File.mtime(file).strftime("%Y-%m-%d %p %I:%S")}\t#{type}\t#{size}\t#{file}"
        rescue
            puts "파일을 찾을 수 없습니다."
        end
    end
   
    def sub_dir(dir)
        Dir.chdir(dir)
        puts "\n #{Dir.pwd} 디렉토리\n\n"
        Dir.foreach(Dir.pwd) { |x| print_file_info(x)}
        Dir.chdir("..")
    end
   
    def dir()
        for v in @input
            if FileTest.directory?(v)
                sub_dir(v)
            else
                puts "\n #{Dir.pwd} 디렉토리\n\n"
                print_file_info(v)
            end
        end
        puts "\ntotal_file\t: #{add_comma(@total_file)}\ttotal_size\t: #{add_comma(@total_size)}\n"
        puts "total_dir\t: #{add_comma(@total_dir)}\tavailable_size\t: #{get_available_size()}\n"
    end
end


Adir.new(ARGV).dir
```