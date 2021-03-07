const database = firebase.firestore();
const maincollection = database.collection('accounts');
const d_expensesubcollection = maincollection.doc('5').collection('d_expense');

const userList = document.querySelector('#d_showexpenselist');

function renderincomelist(user){
    let li = document.createElement('li');
    let divcontainer =document.createElement('div');
    let tdname = document.createElement('div');
    let tdmob = document.createElement('div');
    let tdidnumbeer = document.createElement('div');
    let tddob = document.createElement('div');
    let button = document.createElement('input');

    divcontainer.setAttribute("class","list_flex");
    tdname.setAttribute("class","list_flex_value");
    tdmob.setAttribute("class","list_flex_value");
    tddob.setAttribute("class","list_flex_value");
    tdidnumbeer.setAttribute("class","list_flex_value");
    button.setAttribute("class","list_flex_value");

    li.setAttribute('data-id', user.id);
    tdname.textContent = user.data().d_expensedate;
    tdmob.textContent = user.data().d_expensetitle;
    tdidnumbeer.textContent = user.data().d_expenseamount;
    button.style.color = "white";
    button.type="button";
    button.style.backgroundColor = "black";
    button.style.padding = "1em 1.5em";
    button.textContent = "Delete This";
    button.value = "Delete";
    console.log("id :"+user.id);
    button.onclick = function(){
        var userid = user.id;
        d_expensesubcollection.doc(userid).delete();
        setTimeout(function(){
                location.reload(); },
            1500);
    }

    divcontainer.appendChild(tdname);
    divcontainer.appendChild(tdidnumbeer);
    divcontainer.appendChild(tdmob);
    divcontainer.appendChild(button);

    li.appendChild(divcontainer);
    userList.appendChild(li);

}

const queryforlist = d_expensesubcollection.orderBy('d_expensedate','desc');
queryforlist.get().then(snapshot => {
    snapshot.forEach(user => {
        renderincomelist(user);
    });

});



const searchbtnclick = document.getElementById('searchbtnex');


searchbtnclick.addEventListener('click', e => {
    e.preventDefault();
    var  datestart = document.getElementById('datestart').value;
    var  dateend = document.getElementById('dateend').value;
    document.getElementById('d_showexpenselist').innerHTML="";
    console.log("date");
    const query = d_expensesubcollection.where('d_expensedate','>=',datestart)
        .where('d_expensedate','<=',dateend);
    query.get().then(snapshot => {
        snapshot.forEach(user => {
            renderincomelist(user);
        });
    })
        .catch(error => {
            console.error(error);
        });
});
