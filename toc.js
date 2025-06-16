// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="Index.html">들어가며</a></li><li class="chapter-item expanded affix "><li class="part-title">Git</li><li class="chapter-item expanded "><a href="git/git.html">git</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="git/git-commit-message.html">git commit message</a></li><li class="chapter-item expanded "><a href="git/git-hook.html">git hook</a></li><li class="chapter-item expanded "><a href="git/github.html">github</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">Service</li><li class="chapter-item expanded "><a href="docker/docker.html">docker</a></li><li class="chapter-item expanded "><a href="service/jenkins/jenkins.html">jenkins</a></li><li class="chapter-item expanded affix "><li class="part-title">Os</li><li class="chapter-item expanded "><a href="os-windows/os-windows.html">Windows</a></li><li class="chapter-item expanded "><a href="os-macos/os-macos.html">macOs</a></li><li class="chapter-item expanded "><a href="os-linux/os-linux.html">Linux</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="os-linux/archlinux.html">archlinux</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">News</li><li class="chapter-item expanded "><a href="news/news.html">News</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="news/pope/pope-tv.html">pope-tv</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">Document</li><li class="chapter-item expanded "><a href="document/markdown.html">Markdown</a></li><li class="chapter-item expanded "><a href="document/asciidoc.html">AsciiDoc</a></li><li class="chapter-item expanded "><a href="document/plantuml.html">Plantuml</a></li><li class="chapter-item expanded "><a href="document/mermaid.html">Mermaid</a></li><li class="chapter-item expanded "><a href="document/changelog.html">Change Log</a></li><li class="chapter-item expanded "><a href="document/ADR.html">Architecture Decision Records</a></li><li class="chapter-item expanded affix "><li class="part-title">Editor</li><li class="chapter-item expanded "><a href="editor/editor-vscode.html">Vscode</a></li><li class="chapter-item expanded affix "><li class="part-title">Translate</li><li class="chapter-item expanded "><a href="translate/omegat.html">OmegaT</a></li><li class="chapter-item expanded affix "><li class="part-title">Company</li><li class="chapter-item expanded "><a href="company-amazon/company-amazon.html">Company Amazon</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="company-amazon/amazon-s3.html">Amazon S3</a></li></ol></li><li class="chapter-item expanded "><a href="company-google/company-google.html">Company Google</a></li><li class="chapter-item expanded "><a href="company-microsoft/company-microsoft.html">Company Microsoft</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
