const datepicker = document.getElementById('today');
const personname = document.getElementById('personname');
const loanamount = document.getElementById('loanamount');
const loanphonenumber = document.getElementById('loanphonenumber');
const date = moment().format("YYYY-MM-DD");
const time = moment().format("hh:mm:ss a");
const addBtndetails = document.getElementById('addloan');
const inputid = moment().format('DDMMYhhmmss').toString();
const database = firebase.firestore();

//alert(inputid.toString());
const maincollection = database.collection('accounts');
const loansubcollection = maincollection.doc('6').collection('loan');
const incomesubcollection = maincollection.doc('1').collection('income');
const expensesubcollection = maincollection.doc('2').collection('expense');


//
//
addBtndetails.addEventListener('click', e => {
    //income add option
    e.preventDefault();
    if ((parseInt(loanamount.value)>=0)){
        loansubcollection.doc(inputid).set({
            loandate: datepicker.value,
            personname: personname.value,
            loanamount: loanamount.value,
            loanphonenumber: loanphonenumber.value,
            id: inputid,
            time: time
        },{merge:true})
            .then(()=>{
                console.log("loan Added!!!");
                document.getElementById('from').reset();
                window.location.reload();
            })
            .catch(error => {
                alert(error)
            });
        var incomecategory= "লোন";
        incomesubcollection.doc(inputid).set({
            incomeorganisationname: "",
            donationgivermobile: loanphonenumber.value,
            donationgivername: personname.value,
            incomeamount: loanamount.value,
            incomecategory: incomecategory,
            paidamount: loanamount.value,
            dueamount: 0,
            date: datepicker.value,
            date: datepicker.value,
            id: inputid,
            time: time
        },{merge:true})
            .then(()=>{
                console.log("Income Added!!!");
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



//==============================loan history====================================

const userListex = document.querySelector('#loanhistory');
const searchbtncategoryex = document.getElementById('searchbtnex');


function renderincomelistex(user){
    let li = document.createElement('li');
    let divcontainer =document.createElement('div');
    let tdname = document.createElement('div');
    let tdidnumbeer = document.createElement('div');
    let tddob = document.createElement('div');
    let buttonex = document.createElement('input');
    // let buttonre = document.createElement('input');

    divcontainer.setAttribute("class","list_flex");
    tdname.setAttribute("class","list_flex_value");
    tddob.setAttribute("class","list_flex_value");
    tdidnumbeer.setAttribute("class","list_flex_value");
    //buttonex.setAttribute("class","list_flex_value");
    buttonex.style.color = "white";
    buttonex.type="button";
    buttonex.style.backgroundColor = "black";
    // buttonex.style.padding = "1em 1.5em";
    //  buttonex.style.paddingBottom = "1000px";

    buttonex.style.marginTop= "0px";

    li.setAttribute('data-id', user.id);
    tdname.textContent = user.data().loandate;
    tdidnumbeer.textContent = user.data().personname;
    tddob.textContent = user.data().loanamount;
    buttonex.textContent = "Loan Paid";
    buttonex.value = "Loan Paid";
    buttonex.onclick = function(){
        var userid = user.id;
        console.log(userid);

        const queryfordue = loansubcollection.where('id','==',userid);

        queryfordue.get().then(snapshot => {
                snapshot.forEach(user => {
                    const expenseamount = user.data().loanamount;
                    const expensetitle = "লোন";
                    const expensecategory = "লোন";
                    const datenew = moment().format("YYYY-MM-DD");
                    expensesubcollection.doc(user.id).set({
                        expenseamount: expenseamount,
                        expensetitle: expensetitle,
                        expensecategory: expensecategory,
                        id: userid,
                        date: datenew,
                        time: time
                    },{merge:true})
                        .then(()=>{
                            console.log("data has been saved in Expense subcollection");
                            loansubcollection.doc(userid).delete();
                        })
                        .catch(error => {
                            alert(error)
                        });
                });
            })
                .catch(error => {
                    console.error(error);
                });
            setTimeout(function(){
                    location.reload(); },
                1500);

    }
    divcontainer.appendChild(tdname);
    divcontainer.appendChild(tdidnumbeer);
    divcontainer.appendChild(tddob);
    divcontainer.appendChild(buttonex);

    li.appendChild(divcontainer);
    userListex.appendChild(li);

}

const queryforlistex = loansubcollection.orderBy('loandate','desc');
queryforlistex.get().then(snapshot => {
    snapshot.forEach(user => {
        console.log(user.id);
        renderincomelistex(user);
    });

});



/////////////////////////////////// search loan history/////////////////////////////////////

searchbtncategoryex.addEventListener('click', e => {
    e.preventDefault();
    var  datestart = document.getElementById('datestart').value;
    var  dateend = document.getElementById('dateend').value;
    document.getElementById('loanhistory').innerHTML="";
    console.log("date");

///////////////////////////////////////////////////////////////////////////////

        console.log("date");
        const query = loansubcollection.where('loandate','>=',datestart)
            .where('loandate','<=',dateend);
        query.get().then(snapshot => {
            snapshot.forEach(user => {
                renderincomelistex(user);
            });
        })
            .catch(error => {
                console.error(error);
            });
});