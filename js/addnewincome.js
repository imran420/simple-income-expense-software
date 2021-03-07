const incometitle = document.getElementById('incometitle');
const incomeamount = document.getElementById('incomeamount');
const incomeorganisationname = document.getElementById('incomeorganization');
const incomecategory = document.getElementById('category');
const paidamount = document.getElementById('paidamount');
const dueamount = document.getElementById('dueamount');
const incomeby = document.getElementById('incomeby');
const incomebymobile = document.getElementById('incomebymobile');
const datepicker = document.getElementById('incomedate');
const date = moment().format("YYYY-MM-DD");
const time = moment().format("hh:mm:ss a");
const addBtndetails = document.getElementById('addincome');
const inputid = moment().format('DDMMYhhmmss').toString();
const database = firebase.firestore();

//alert(inputid.toString());
const maincollection = database.collection('accounts');
const incomesubcollection = maincollection.doc('1').collection('income');
const duesubcollection = maincollection.doc('3').collection('due');


addBtndetails.addEventListener('click', e => {
    //income add option
    e.preventDefault();

    var res = parseInt(paidamount.value) + parseInt(dueamount.value);
    var mainamount= parseInt(incomeamount.value);

    if (parseInt(dueamount.value)==0){
        if (res==mainamount){
            if ((parseInt(incomeamount.value)>=0) && (incomebymobile.value.length==11)){
                incomesubcollection.doc(inputid).set({
                    incomeorganisationname: incomeorganisationname.value,
                    donationgivermobile: incomebymobile.value,
                    donationgivername: incomeby.value,
                    incomeamount: incomeamount.value,
                    incomecategory: incomecategory.value,
                    paidamount: paidamount.value,
                    dueamount: dueamount.value,
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
                alert("Inter amount correctly OR mobile number correctly");
            }
        }
        else {
            alert("Inter the Due and Paid amount correctly");
        }
    }
    else {
        if(res==mainamount){
            if ((parseInt(incomeamount.value)>=0) && (incomebymobile.value.length==11)){
                incomesubcollection.doc(inputid).set({
                    incomeorganisationname: incomeorganisationname.value,
                    donationgivermobile: incomebymobile.value,
                    donationgivername: incomeby.value,
                    incomeamount: incomeamount.value,
                    incomecategory: incomecategory.value,
                    paidamount: paidamount.value,
                    dueamount: dueamount.value,
                    date: datepicker.value,
                    date: datepicker.value,
                    id: inputid,
                    time: time
                },{merge:true})
                    .then(()=>{
                        console.log("data hase been saved in income subcollection")
                    })
                    .catch(error => {
                        alert(error)
                    });

                duesubcollection.doc(inputid).set({
                    incomeorganisationname: incomeorganisationname.value,
                    donationgivermobile: incomebymobile.value,
                    donationgivername: incomeby.value,
                    incomeamount: incomeamount.value,
                    incomecategory: incomecategory.value,
                    paidamount: paidamount.value,
                    dueamount: dueamount.value,
                    date: datepicker.value,
                    date: datepicker.value,
                    id: inputid,
                    time: time
                },{merge:true})
                    .then(()=>{
                        console.log("Due Added!!!");
                        document.getElementById('from').reset();
                        window.location.reload();
                    })
                    .catch(error => {
                        alert(error)
                    });
            }
            else {
                alert("Inter amount correctly OR mobile number correctly");
            }
        }
        else {
            alert("Inter the Due and Paid amount correctly");
        }
    }




});





//==============================income history====================================

const userList = document.querySelector('#incomehistory');

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
    tdname.textContent = user.data().date;
    tdidnumbeer.textContent = user.data().incomecategory;
    tddob.textContent = user.data().incomeamount;

    divcontainer.appendChild(tdname);
    divcontainer.appendChild(tdidnumbeer);
    divcontainer.appendChild(tddob);

    li.appendChild(divcontainer);
    userList.appendChild(li);

}

const queryforlist = incomesubcollection.orderBy('date','desc').limit(10);
queryforlist.get().then(snapshot => {
    snapshot.forEach(user => {
        console.log(user.id);
        renderincomelist(user);
    });

});



