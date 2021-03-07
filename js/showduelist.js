const database = firebase.firestore();
const maincollection = database.collection('accounts');
const duesubcollection = maincollection.doc('3').collection('due');
const duetoincomesubcollection = maincollection.doc('1').collection('income');
const dueuserList = document.querySelector('#duehistory');

function renderincomelist(user){
    let li = document.createElement('li');
    let divcontainer =document.createElement('div');
    let tdname = document.createElement('div');
    let tddate = document.createElement('div');
    let tdphone = document.createElement('div');
    let tdtotalamount = document.createElement('div');
    let tdadvanceamount = document.createElement('div');
    let tddueamount = document.createElement('div');
    //let tdstatus = document.createElement('a');
    let tdstatus = document.createElement('button');


    divcontainer.setAttribute("class","list_flex");
    tddate.setAttribute("class","list_flex_value");
    tdname.setAttribute("class","list_flex_value");
    tdphone.setAttribute("class","list_flex_value");
    tdtotalamount.setAttribute("class","list_flex_value");
    tdadvanceamount.setAttribute("class","list_flex_value");
    tddueamount.setAttribute("class","list_flex_value");
    tdstatus.setAttribute("class","list_flex_value");
    tdstatus.style.color = "white";
    tdstatus.style.backgroundColor = "black";
    tdstatus.style.padding = "1em 1.5em";
    tdstatus.style.textDecoration = "none";

    li.setAttribute('data-id', user.id);
    tddate.textContent = user.data().date;
    tdname.textContent = user.data().donationgivername;
    tdphone.textContent = user.data().donationgivermobile;
    tdtotalamount.textContent = user.data().incomeamount;
    tdadvanceamount.textContent = user.data().paidamount;
    tddueamount.textContent = user.data().dueamount;
    tdstatus.textContent = "Now Paid";
    tdstatus.value= user.id;
    tdstatus.onclick = function(){
        const queryfordue = duesubcollection.where('id','==',user.id);

        queryfordue.get().then(snapshot => {
            snapshot.forEach(user => {
                const newpaid = user.data().incomeamount;
                duetoincomesubcollection.doc(user.id).set({
                    paidamount: newpaid,
                    dueamount: ""
                },{merge:true})
                    .then(()=>{
                        console.log("data has been saved in income subcollection");
                        duesubcollection.doc(user.id).delete();
                        window.location.href="due.html";
                    })
                    .catch(error => {
                        alert(error)
                    });
            });
        })
            .catch(error => {
                console.error(error);
            });

    }
    divcontainer.appendChild(tddate);
    divcontainer.appendChild(tdname);
    divcontainer.appendChild(tdphone);
    divcontainer.appendChild(tdtotalamount);
    divcontainer.appendChild(tdadvanceamount);
    divcontainer.appendChild(tddueamount);
    divcontainer.appendChild(tdstatus);

    li.appendChild(divcontainer);
    dueuserList.appendChild(li);

}

const queryforlist = duesubcollection.limit(40);
queryforlist.get().then(snapshot => {
    snapshot.forEach(user => {
        console.log(user.id);
        renderincomelist(user);
    });

});