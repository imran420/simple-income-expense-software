const database = firebase.firestore();
const maincollection = database.collection('accounts');
const d_incomesubcollection = maincollection.doc('4').collection('d_income');

const userList = document.querySelector('#b_incomehistory');

function renderincomelist(user){
    let li = document.createElement('li');
    let divcontainer =document.createElement('div');
    let tdname = document.createElement('div');
    let tdmob = document.createElement('div');
    let tdidnumbeer = document.createElement('div');
    let tddob = document.createElement('div');
    let butex = document.createElement('input');

    divcontainer.setAttribute("class","list_flex");
    tdname.setAttribute("class","list_flex_value");
    tdmob.setAttribute("class","list_flex_value");
    tddob.setAttribute("class","list_flex_value");
    tdidnumbeer.setAttribute("class","list_flex_value");
    butex.setAttribute("class","list_flex_value");

    li.setAttribute('data-id', user.id);
    tdname.textContent = user.data().d_incomedate;
    tdmob.textContent = user.data().d_incomebymobile;
    tdidnumbeer.textContent = user.data().d_incomeorganization;
    tddob.textContent = user.data().d_incomeamount;

    butex.style.color = "white";
    butex.type="button";
    butex.style.backgroundColor = "black";
    butex.style.padding = "1em 1.5em";
    butex.textContent = "Delete This";
    butex.value = "Delete";
    console.log("id :"+user.id);
    butex.onclick = function(){
        var userid = user.id;
        d_incomesubcollection.doc(userid).delete();
        setTimeout(function(){
            location.reload(); },
            1500);
    }

    divcontainer.appendChild(tdname);
    divcontainer.appendChild(tdidnumbeer);
    divcontainer.appendChild(tdmob);
    divcontainer.appendChild(tddob);
    divcontainer.appendChild(butex);

    li.appendChild(divcontainer);
    userList.appendChild(li);

}

const queryforlist = d_incomesubcollection.orderBy('d_incomedate','desc');
queryforlist.get().then(snapshot => {
    snapshot.forEach(user => {
        renderincomelist(user);
    });

});



const searchbtnclick = document.getElementById('searchbtn');


searchbtnclick.addEventListener('click', e => {
    e.preventDefault();
    var  datestart = document.getElementById('datestart').value;
    var  dateend = document.getElementById('dateend').value;
    document.getElementById('b_incomehistory').innerHTML="";
    console.log("date");
    const query = d_incomesubcollection.where('d_incomedate','>=',datestart)
        .where('d_incomedate','<=',dateend);
    query.get().then(snapshot => {
        snapshot.forEach(user => {
            renderincomelist(user);
        });
    })
        .catch(error => {
            console.error(error);
        });
});
