const d_expensedate = document.getElementById('today');
const d_expenseamount = document.getElementById('d_expenseamount');
const d_expensetitle = document.getElementById('d_expensetitle');
const inputid = moment().format('DDMMYhhmmss').toString();
const time = moment().format("hh:mm:ss a");
const addBtndetails = document.getElementById('adddonationexpense');



const database = firebase.firestore();
const maincollection = database.collection('accounts');
const d_expensesubcollection = maincollection.doc('5').collection('d_expense');

addBtndetails.addEventListener('click', e => {
    e.preventDefault();
    if ((parseInt(d_expenseamount.value)>0)){
        d_expensesubcollection.doc(inputid).set({
            d_expensedate: d_expensedate.value,
            d_expenseamount: d_expenseamount.value,
            d_expensetitle: d_expensetitle.value,
            time: time
        },{merge:true})
            .then(()=>{
                console.log("Donation expense Added!!!");
                document.getElementById('from').reset();
                window.location.reload();
            })
            .catch(error => {
                alert(error)
            });
    }
    else {
        alert("Inter amount correctly");
    }
});

//=====================================show list=========================================


const userList = document.querySelector('#d_expensehistory');

function renderincomelist(user){
    let li = document.createElement('li');
    let divcontainer =document.createElement('div');
    let tdname = document.createElement('div');
    let tdidnumbeer = document.createElement('div');
    let tddob = document.createElement('div');

    divcontainer.setAttribute("class","list_flex");
    tdname.setAttribute("class","list_flex_value");
    tddob.setAttribute("class","list_flex_value");
    tdidnumbeer.setAttribute("class","list_flex_value");

    li.setAttribute('data-id', user.id);
    tdname.textContent = user.data().d_expensedate;
    tdidnumbeer.textContent = user.data().d_expensetitle;
    tddob.textContent = user.data().d_expenseamount;

    divcontainer.appendChild(tdname);
    divcontainer.appendChild(tdidnumbeer);
    divcontainer.appendChild(tddob);

    li.appendChild(divcontainer);
    userList.appendChild(li);

}

const queryforlist = d_expensesubcollection.orderBy('d_expensedate','desc').limit(10);
queryforlist.get().then(snapshot => {
    snapshot.forEach(user => {
        renderincomelist(user);
    });

});
