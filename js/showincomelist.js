
const userListincome = document.querySelector('#incomehistory');
const searchbtncategory = document.getElementById('searchbtn');
const main =database.collection('accounts');
const deletedata = main.doc('1').collection('income');

function renderincomelist(user){
    let li = document.createElement('li');
    let divcontainer =document.createElement('div');
    let tdname = document.createElement('div');
    let tddate = document.createElement('div');
    let tdphone = document.createElement('div');
    let tdtotalamount = document.createElement('div');
    let tdadvanceamount = document.createElement('div');
    let tddueamount = document.createElement('div');
    let buttonex = document.createElement('input');


    divcontainer.setAttribute("class","list_flex");
    tddate.setAttribute("class","list_flex_value");
    tdname.setAttribute("class","list_flex_value");
    tdphone.setAttribute("class","list_flex_value");
    tdtotalamount.setAttribute("class","list_flex_value");
    tdadvanceamount.setAttribute("class","list_flex_value");
    tddueamount.setAttribute("class","list_flex_value");
    buttonex.style.color = "white";
    buttonex.type="button";
    buttonex.style.backgroundColor = "black";
    buttonex.style.padding = "1em 1.5em";


    li.setAttribute('data-id', user.id);
    tddate.textContent = user.data().date;
    tdname.textContent = user.data().donationgivername;
    tdphone.textContent = user.data().incomeorganisationname;
    tdtotalamount.textContent = user.data().donationgivermobile;
    tdadvanceamount.textContent = user.data().incomecategory;
    tddueamount.textContent = user.data().incomeamount;
    buttonex.textContent = "Delete This";
     buttonex.value = "Delete";
    console.log("id :"+user.id);
    buttonex.onclick = function(){
        var userid = user.id;
        deletedata.doc(userid).delete();
        setTimeout(function(){
                location.reload(); },
            1500);
    }


    divcontainer.appendChild(tddate);
    divcontainer.appendChild(tdname);
    divcontainer.appendChild(tdphone);
    divcontainer.appendChild(tdtotalamount);
    divcontainer.appendChild(tdadvanceamount);
    divcontainer.appendChild(tddueamount);
    divcontainer.appendChild(buttonex);

    li.appendChild(divcontainer);
    userListincome.appendChild(li);

}
//==================================list view================================================
const queryforincomelist = incomesubcollection.orderBy('date','desc');
queryforincomelist.get().then(snapshot => {
        snapshot.forEach(user => {
            renderincomelist(user);
        });
});


//============================search Btn===================================================//
searchbtncategory.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('fromhistory').reset();

    var  searchbycategory = document.getElementById('category').value;

    var  datestart = document.getElementById('datestart').value;
    var  dateend = document.getElementById('dateend').value;
    document.getElementById('incomehistory').innerHTML="";
    if (searchbycategory !=="" && datestart===""){
        const query = incomesubcollection.where('incomecategory', '==', searchbycategory);
        query.get().then(snapshot => {
            snapshot.forEach(user => {
                renderincomelist(user);
            });
        })
            .catch(error => {
                console.error(error);
            });

    }
    else if(searchbycategory !=="" && datestart!==""){
        console.log("date and category");
        const query = incomesubcollection.where('incomecategory', '==', searchbycategory).where('date','>=',datestart)
            .where('date','<=',dateend);
        query.get().then(snapshot => {
            snapshot.forEach(user => {
                renderincomelist(user);
            });
        })
            .catch(error => {
                console.error(error);
            });
    }

    else {
        console.log("date");
        const query = incomesubcollection.where('date','>=',datestart)
            .where('date','<=',dateend);
        query.get().then(snapshot => {
            snapshot.forEach(user => {
                renderincomelist(user);
            });
        })
            .catch(error => {
                console.error(error);
            });
    }


});

