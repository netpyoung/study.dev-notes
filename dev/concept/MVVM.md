MVVM
====


* http://blogs.msdn.com/b/johngossman/archive/2005/10/08/478683.aspx


## Windows Phone 7 Development Using MVVM and Unit Testing
* http://www.codemag.com/Article/1201081


	MVVM, however, also has drawbacks:
	* Lack of standardization and guidance
	* It may be overkill for simple UI programming
	* If not managed well, there is a tendency for duplicated code



## What is the difference between MVC and MVVM?
* http://stackoverflow.com/questions/667781/what-is-the-difference-between-mvc-and-mvvm


	The basic MVCVM guidelines we follow are:

	Views display a certain shape of data. They have no idea where the data comes from.
	ViewModels hold a certain shape of data and commands, they do not know where the data, or code, comes from or how it is displayed.
	Models hold the actual data (various context, store or other methods)
	Controllers listen for, and publish, events.
	Controllers provide the logic that controls what data is seen and where.
	Controllers provide the command code to the ViewModel so that the ViewModel is actually reusable.



## Command 패턴
* http://en.wikipedia.org/wiki/Command_pattern
* Command pattern 김우진 - http://www.slideshare.net/WooGenius/command-pattern-40665875

