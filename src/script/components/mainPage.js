class mainPage {
  check() {
    if (localStorage.getItem("token")) {
      this.render();
      this.Handlers();
    } else {
      let code = location.href;
      code = code.split("?");
      code = code.splice(1, 1);
      code = String(code);
      code = code.slice(5).split("&")[0];
      console.log(code);
      fetch(
        `https://slack.com/api/oauth.access?client_id=217857254422.216894611363&client_secret=73b8f39e3b53e9635094ae7ce4d1bf69&code=${code}`
      )
        .then(response => response.json())
        .then(data => {
          let token = data.access_token;
          localStorage.setItem("token", `${token}`);
          localStorage.setItem("user", `${data.user_id}`);
          this.render();
          this.Handlers();
        });
    }
  }

  render() {
    let place = document.querySelector("div");
    place.innerHTML = `
    <div class="conteiner">
    <div class="infoBox">
        <div class="userInfo">
            <span class="userName">name</span>
        </div>
        <div class="contacts">
 
        </div>
    </div>
    <div class="chat">
        <div class="control">
            <span class="nameGroup">nameGroup</span>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
                <label class="mdl-button mdl-js-button mdl-button--icon" for="sample6">
                    <i class="material-icons">search</i>
                </label>
                <div class="mdl-textfield__expandable-holder">
                    <input class="mdl-textfield__input" type="text" id="sample6">
                    <label class="mdl-textfield__label" for="sample-expandable">Expandable Input</label>
                </div>
            </div>
        </div>
        <div class="workPlace">
            
        </div>
        <div class="inputMsg">
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label myMdl-textfield">
                <textarea class="mdl-textfield__input sendMessage" type="text" id="sample3" ></textarea>
                <label class="mdl-textfield__label" for="sample3">Text...</label>
            </div>
        </div>
    </div>
</div>
     `;
  }
  Handlers() {
    document.querySelector(".sendMessage").addEventListener("keypress", e => {
      let key = e.which || e.keyCode;
      if (key === 13) {
        this.sendMessage();
      }
    });
  }
  sendMessage() {
    let message = document.querySelector(".sendMessage").value;
    let user = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    let channel = localStorage.getItem("channel");
    if (message) {
      fetch(
        `https://slack.com/api/chat.postMessage?token=${token}&channel=${channel}&text=${message}&as_user=${user}&username=${user}&pretty=1`
      ).then((document.querySelector(".sendMessage").value = ""));
    }
  }
}
export default mainPage;
