ngui prevent Word wrap
=========================

UIFont.cs
```cs
//			// If this marks the end of a word, add it to the final string.
//			if (ch == ' ' && previousChar != ' ' && start < offset)
//			{
//				sb.Append(text.Substring(start, offset - start + 1));
//				lineIsEmpty = false;
//				start = offset + 1;
//				previousChar = ch;
//			}
```