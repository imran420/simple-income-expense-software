const expensetitle = document.getElementById('expensetitle');
const expenseamount = document.getElementById('amount');
const date = moment().format("YYYY-MM-DD");
const time = moment().format("hh:mm:ss a");
const addBtndetails = document.getElementById('addexpense');
const expensecategory = document.getElementById('category');
const expensedate = document.getElementById('expensedate');

const inputid = moment().format('DDMMYhhmmss').toString();
const database = firebase.firestore();

//alert(inputid.toString());
const maincollection = database.collection('accounts');
const expensesubcollection = maincollection.doc('2').collection('expense');


addBtndetails.addEventListener('click', e => {
    //income add option
    e.preventDefault();
    if ((parseInt(expenseamount.value)>0)){
        expensesubcollection.doc(inputid).set({
            expenseamount: expenseamount.value,
            expensetitle: expensetitle.value,
            expensecategory: expensecategory.value,
            date: expensedate.value,
            time: time
        },{merge:true})
            .then(()=>{
                console.log("Expense Added!!!");
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



//==============================expense history====================================

const userList = document.querySelector('#expensehistory');

function renderincomelist(user){
    let li = document.createElement('li');
    let divcontainer =document.createElement('div');
    let tdname = document.createElement('div');
    let tdidnumbeer = document.createElement('div');
    let tddob = document.createElement('div');
    let extitle = document.createElement('div');

    divcontainer.setAttribute("class","list_flex");
    tdname.setAttribute("class","list_flex_value");
    tddob.setAttribute("class","list_flex_value");
    tdidnumbeer.setAttribute("class","list_flex_value");
    extitle.setAttribute("class","list_flex_value");

    li.setAttribute('data-id', user.id);
    tdname.textContent = user.data().date;
    tdidnumbeer.textContent = user.data().expensecategory;
    tddob.textContent = user.data().expenseamount;
    extitle.textContent = user.data().expensetitle;

    divcontainer.appendChild(tdname);
    divcontainer.appendChild(tdidnumbeer);
    divcontainer.appendChild(tddob);

    li.appendChild(divcontainer);
    userList.appendChild(li);

}

const queryforlist = expensesubcollection.orderBy('date','desc').limit(10);
queryforlist.get().then(snapshot => {
    snapshot.forEach(user => {
        renderincomelist(user);
    });

});





