var selfEasyrtcid = "";

function connect() {
    easyrtc.setRoomOccupantListener(convertListToButtons);
    easyrtc.easyApp("Video_call_app", "selfVideo", ["callerVideo"], loginSuccess, loginFailure);
}

function clearConnectList() {
    var otherClientDiv = document.getElementById('otherClients');
    while (otherClientDiv.hasChildNodes()) {
        otherClientDiv.removeChild(otherClientDiv.lastChild);
    }
}

function performCall(otherId) {
    easyrtc.hangupAll();
    var successCB = function() {};
    var failureCB = function() {};
    easyrtc.call(otherId, successCB, failureCB);
}

function convertListToButtons (roomName, participants, isPrimary) {
    clearConnectList();
    var otherClientDiv = document.getElementById('otherClients');
    for(var id in participants) {
        var button = document.createElement('button');
        button.onclick = function(otherId) {
            return function() {
                performCall(otherId);
            };
        }(id);

        var label = document.createTextNode(easyrtc.idToName(id));
        button.appendChild(label);
        otherClientDiv.appendChild(button);
    }
}


function loginSuccess(easyrtcid) {
    selfEasyrtcid = easyrtcid;
    document.getElementById("iam").innerHTML = "I am " + easyrtc.cleanId(easyrtcid);
}


function loginFailure(errorCode, message) {
    easyrtc.showError(errorCode, message);
}
