function onBlockLoad () {
    var infor_panel_scroll_pos = 0;

    // Create the first modal (pdf-modal)
    globalThis.createModal = () => {
        var modal = document.getElementById("pdf-modal");
        var old_position = null;
        var old_width = null;
        var old_left = null;
        var expanded = false;

        modal.id = "pdf-modal";
        modal.className = "modal";
        modal.innerHTML = `
            <div class="modal-content">
              <div class="modal-header">
                <span class="close" id="modal-close">&times;</span>
                <span class="close" id="modal-expand">&#x26F6;</span>
              </div>
              <div class="modal-body">
                <pdfjs-viewer-element id="pdf-viewer" viewer-path="/file=PDFJS_PREBUILT_DIR" locale="en" phrase="true">
                </pdfjs-viewer-element>
              </div>
            </div>
        `;

        modal.querySelector("#modal-close").onclick = function() {
          modal.style.display = "none";
          var info_panel = document.getElementById("html-info-panel");
          if (info_panel) {
            info_panel.style.display = "block";
          }
          var scrollableDiv = document.getElementById("chat-info-panel");
          scrollableDiv.scrollTop = infor_panel_scroll_pos;
        };

        modal.querySelector("#modal-expand").onclick = function () {
          expanded = !expanded;
          if (expanded) {
            old_position = modal.style.position;
            old_left = modal.style.left;
            old_width = modal.style.width;

            modal.style.position = "fixed";
            modal.style.width = "70%";
            modal.style.left = "15%";
          } else {
            modal.style.position = old_position;
            modal.style.width = old_width;
            modal.style.left = old_left;
          }
        };
    }

    // Create the second modal (pdf-modal_2)
    globalThis.createModal_2 = () => {
        var modal_2 = document.getElementById("pdf-modal_2");
        var old_position = null;
        var old_width = null;
        var old_left = null;
        var expanded = false;

        modal_2.id = "pdf-modal_2";
        modal_2.className = "modal";
        modal_2.innerHTML = `
            <div class="modal-content">
              <div class="modal-header">
                <span class="close" id="modal-close_2">&times;</span>
                <span class="close" id="modal-expand_2">&#x26F6;</span>
              </div>
              <div class="modal-body">
                <pdfjs-viewer-element id="pdf-viewer_2" viewer-path="/file=PDFJS_PREBUILT_DIR" locale="en" phrase="true">
                </pdfjs-viewer-element>
              </div>
            </div>
        `;

        modal_2.querySelector("#modal-close_2").onclick = function() {
          modal_2.style.display = "none";
          var info_panel_2 = document.getElementById("html-info-panel_2");
          if (info_panel_2) {
            info_panel_2.style.display = "block";
          }
          var scrollableDiv = document.getElementById("chat-info-panel_2");
          scrollableDiv.scrollTop = infor_panel_scroll_pos;
        };

        modal_2.querySelector("#modal-expand_2").onclick = function () {
          expanded = !expanded;
          if (expanded) {
            old_position = modal_2.style.position;
            old_left = modal_2.style.left;
            old_width = modal_2.style.width;

            modal_2.style.position = "fixed";
            modal_2.style.width = "70%";
            modal_2.style.left = "15%";
          } else {
            modal_2.style.position = old_position;
            modal_2.style.width = old_width;
            modal_2.style.left = old_left;
          }
        };
    }

    // Function to open modal and display PDF
    globalThis.openModal = (event) => {
      event.preventDefault();
      var target = event.currentTarget;
      var src = target.getAttribute("data-src");
      var page = target.getAttribute("data-page");
      var search = target.getAttribute("data-search");
      var phrase = target.getAttribute("data-phrase");

      var pdfViewer = document.getElementById("pdf-viewer");

      current_src = pdfViewer.getAttribute("src");
      if (current_src != src) {
        pdfViewer.setAttribute("src", src);
      }
      pdfViewer.setAttribute("phrase", phrase);
      pdfViewer.setAttribute("search", search);
      pdfViewer.setAttribute("page", page);

      var scrollableDiv = document.getElementById("chat-info-panel");
      infor_panel_scroll_pos = scrollableDiv.scrollTop;

      var modal = document.getElementById("pdf-modal")
      modal.style.display = "block";
      var info_panel = document.getElementById("html-info-panel");
      if (info_panel) {
        info_panel.style.display = "none";
      }
      scrollableDiv.scrollTop = 0;
    }

    globalThis.openModal_2 = (event) => {
      event.preventDefault();
      var target = event.currentTarget;
      var src = target.getAttribute("data-src");
      var page = target.getAttribute("data-page");
      var search = target.getAttribute("data-search");
      var phrase = target.getAttribute("data-phrase");

      var pdfViewer = document.getElementById("pdf-viewer_2");

      current_src = pdfViewer.getAttribute("src");
      if (current_src != src) {
        pdfViewer.setAttribute("src", src);
      }
      pdfViewer.setAttribute("phrase", phrase);
      pdfViewer.setAttribute("search", search);
      pdfViewer.setAttribute("page", page);

      var scrollableDiv = document.getElementById("chat-info-panel_2");
      infor_panel_scroll_pos = scrollableDiv.scrollTop;

      var modal = document.getElementById("pdf-modal_2")
      modal.style.display = "block";
      var info_panel = document.getElementById("html-info-panel_2");
      if (info_panel) {
        info_panel.style.display = "none";
      }
      scrollableDiv.scrollTop = 0;
    }

    globalThis.assignPdfOnclickEvent = () => {
        // Get all links and attach click event
        var links = document.getElementsByClassName("pdf-link");
        for (var i = 0; i < links.length; i++) {
            links[i].onclick = openModal;
        }
    }

    globalThis.assignPdfOnclickEvent_2 = () => {
        // Get all links and attach click event for second modal
        var links = document.getElementsByClassName("pdf-link-2");
        for (var i = 0; i < links.length; i++) {
            links[i].onclick = openModal_2;
        }
    }

    var created_modal = document.getElementById("pdf-viewer");
    if (!created_modal) {
        createModal();
        console.log("Created modal")
    }

    var created_modal_2 = document.getElementById("pdf-viewer_2");
    if (!created_modal_2) {
        createModal_2();
        console.log("Created modal 2")
    }

}
