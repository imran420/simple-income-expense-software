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

    divcontainer.setAttribute("class","list_flex");
    tdname.setAttribute("class","list_flex_value");
    tdmob.setAttribute("class","list_flex_value");
    tddob.setAttribute("class","list_flex_value");
    tdidnumbeer.setAttribute("class","list_flex_value");

    li.setAttribute('data-id', user.id);
    tdname.textContent = user.data().d_expensedate;
    tdmob.textContent = user.data().d_expensetitle;
    tdidnumbeer.textContent = user.data().d_expenseamount;

    divcontainer.appendChild(tdname);
    divcontainer.appendChild(tdmob);
    divcontainer.appendChild(tdidnumbeer);

    li.appendChild(divcontainer);
    userList.appendChild(li);

}

const queryforlist = d_expensesubcollection.orderBy('d_expensedate','desc').limit(4);
queryforlist.get().then(snapshot => {
    snapshot.forEach(user => {
        renderincomelist(user);
    });

});


//=============================total expennse===============================================

const queryforlistincome = d_expensesubcollection.orderBy('d_expensedate','desc');
var totalincome=0;
queryforlistincome.get().then(snapshot => {
    snapshot.forEach(user => {
        totalincome= totalincome + parseInt(user.data().d_expenseamount);
    });
    document.getElementById('d_totalexpense').innerHTML = totalincome;
});




//=================================income history=======================================
const d_incomesubcollection = maincollection.doc('4').collection('d_income');

const userListincome = document.querySelector('#d_incomehistory');

function renderincomelistin(user){
    let li = document.createElement('li');
    let divcontainer =document.createElement('div');
    let tdname = document.createElement('div');
    let tdmob = document.createElement('div');
    let tdidnumbeer = document.createElement('div');
    let tddob = document.createElement('div');

    divcontainer.setAttribute("class","list_flex");
    tdname.setAttribute("class","list_flex_value");
    tdmob.setAttribute("class","list_flex_value");
    tddob.setAttribute("class","list_flex_value");
    tdidnumbeer.setAttribute("class","list_flex_value");

    li.setAttribute('data-id', user.id);
    tdname.textContent = user.data().d_incomedate;
    tdidnumbeer.textContent = user.data().d_incomeorganization;
    tddob.textContent = user.data().d_incomeamount;

    divcontainer.appendChild(tdname);
    divcontainer.appendChild(tdidnumbeer);
    divcontainer.appendChild(tddob);

    li.appendChild(divcontainer);
    userListincome.appendChild(li);

}

const queryforlistin = d_incomesubcollection.orderBy('d_incomedate','desc').limit(4);
queryforlistin.get().then(snapshot => {
    snapshot.forEach(user => {
        renderincomelistin(user);
    });

});

const queryforlistexpense = d_incomesubcollection.orderBy('d_incomedate','desc');
var totalincomeex=0;
queryforlistexpense.get().then(snapshot => {
    snapshot.forEach(user => {
        totalincomeex= totalincomeex + parseInt(user.data().d_incomeamount);
    });
        document.getElementById('d_totalincome').innerHTML = totalincomeex;
        const queryforlistex = d_expensesubcollection.orderBy('d_expensedate','desc');
        var totalexpense=0;
            queryforlistex.get().then(snapshot => {
                snapshot.forEach(user => {
                    totalexpense= totalexpense + parseInt(user.data().d_expenseamount);
                });
                var result =0;
                result=(totalincomeex-totalexpense);

                document.getElementById('d_currentbalance').innerHTML = result;
            });
});



