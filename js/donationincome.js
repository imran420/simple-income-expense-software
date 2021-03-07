const d_incomedate = document.getElementById('today');
const d_incomeorganization = document.getElementById('d_incomeorganization');
const d_incomebymobile = document.getElementById('d_incomebymobile');
const d_incomeamount = document.getElementById('d_incomeamount');
const inputid = moment().format('DDMMYhhmmss').toString();
const time = moment().format("hh:mm:ss a");
const addBtndetails = document.getElementById('adddonationincome');



const database = firebase.firestore();
const maincollection = database.collection('accounts');
const d_incomesubcollection = maincollection.doc('4').collection('d_income');

addBtndetails.addEventListener('click', e => {
    e.preventDefault();
    if ((parseInt(d_incomeamount.value)>0)){
        d_incomesubcollection.doc(inputid).set({
            d_incomeamount: d_incomeamount.value,
            d_incomebymobile: d_incomebymobile.value,
            d_incomeorganization: d_incomeorganization.value,
            d_incomedate: d_incomedate.value,
            time: time
        },{merge:true})
            .then(()=>{
                console.log("Donation Income Added!!!");
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


const userList = document.querySelector('#d_incomehistory');

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
    tdname.textContent = user.data().d_incomedate;
    tdidnumbeer.textContent = user.data().d_incomeorganization;
    tddob.textContent = user.data().d_incomeamount;

    divcontainer.appendChild(tdname);
    divcontainer.appendChild(tdidnumbeer);
    divcontainer.appendChild(tddob);

    li.appendChild(divcontainer);
    userList.appendChild(li);

}

const queryforlist = d_incomesubcollection.orderBy('d_incomedate','desc').limit(10);
queryforlist.get().then(snapshot => {
    snapshot.forEach(user => {
       renderincomelist(user);
    });

});
