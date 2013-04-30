http://blog.naver.com/oopdesigner/40052508657

```cs
foreach (Cookie cook in req.CookieContainer.GetCookies(req.RequestUri))
{
	
	Debug.Log("Cookie:");
	Debug.Log(string.Format("{0} = {1}", cook.Name, cook.Value));
	Debug.Log(string.Format("Domain: {0}", cook.Domain));
	Debug.Log(string.Format("Path: {0}", cook.Path));
	Debug.Log(string.Format("Port: {0}", cook.Port));
	Debug.Log(string.Format("Secure: {0}", cook.Secure));
	Debug.Log(string.Format("When issued: {0}", cook.TimeStamp));
	Debug.Log(string.Format("Expires: {0} (expired? {1})", 
	cook.Expires, cook.Expired));
	Debug.Log(string.Format("Don't save: {0}", cook.Discard));    
	Debug.Log(string.Format("Comment: {0}", cook.Comment));
	Debug.Log(string.Format("Uri for comments: {0}", cook.CommentUri));
	Debug.Log(string.Format("String: {0}", cook.ToString()));
}
```