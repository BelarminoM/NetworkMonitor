
function carregarIp(){
    fetch(LOG_JSON)
        .then(function (res) { return res.json() })
        .then(function (pcs) {
            const ips = document.querySelector('#divDesligar')
            let formName =`<div class="form-group">
            <label for="selectIp" style="margin-top: 20px;">Selecione qual Dispositivo deseja Desligar</label>
            <select class="form-control" id="ipDesligar">`
    
            for (pc of pcs) {
                if (pc.set == '1') {
                    formName += ` <option>PC:${pc.nome}</option>`
                }
            }
            formName += `</select>
            <button type="button" class="btn btn-primary" onclick="desligarIp()" style="margin-top:20px;">Desligar</button>
            </div>`
    
            ips.innerHTML = formName
        })
}

function desligarIp(){
    const ipDisp = document.querySelector('#ipDesligar').value
    fetch(LOG_JSON)
        .then(function (res) { return res.json() })
        .then(function (pcs) {
            var pcsplit = ipDisp.split(':')
            var pcIp = pcsplit[1]
            for (pc of pcs) {
                if ((pc.set=='1') && (pc.nome==pcIp)){
                    fetch(`${SHUTDOWN}${pc.ip}`)
                    let aviso = `<p class="titleAterar text - center">O Dispositivo ${pc.nome} foi Desligado</p>`
                    ok(aviso)
                    break
                }
            }
        })
}

function desligarTodos(){
    fetch(LOG_JSON)
        .then(function (res) { return res.json() })
        .then(function (pcs) {
            for (pc of pcs){
                fetch(`${SHUTDOWN}${pc.ip}`)
            }
            let aviso =`<p class="titleAterar text - center">Todos os Dispositivos foram Desligados</p>`
            ok(aviso)
        })
}

function ok(aviso) {
    //função que é chamada quando for necessario a exibição do icone ok
    const val = document.querySelector('#divDesligar')
    let lix = ` ${aviso}
                <div class="text-center" style="margin:50px;">
                <img src="/img/ok.png" class="img-fluid" alt="Responsive image">
              </div>`
    val.innerHTML = lix
}
