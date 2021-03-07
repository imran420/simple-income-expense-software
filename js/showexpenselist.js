
const userListex = document.querySelector('#showexpenselist');
const searchbtncategoryex = document.getElementById('searchbtnex');
const main =database.collection('accounts');
const deletedata = main.doc('2').collection('expense');

function renderincomelistex(user){
    let li = document.createElement('li');
    let divcontainer =document.createElement('div');
    let tdname = document.createElement('div');
    let tdidnumbeer = document.createElement('div');
    let tddob = document.createElement('div');
    let extitle = document.createElement('div');
    let buttonex = document.createElement('input');
    let buttonre = document.createElement('input');

    divcontainer.setAttribute("class","list_flex");
    tdname.setAttribute("class","list_flex_value");
    tddob.setAttribute("class","list_flex_value");
    extitle.setAttribute("class","list_flex_value");
    tdidnumbeer.setAttribute("class","list_flex_value");
    buttonex.style.color = "white";
    buttonex.type="button";
    buttonex.style.backgroundColor = "black";
    buttonex.style.padding = "1em 1.5em";
    buttonex.style.marginRight = "5px";

    buttonre.style.color = "white";
    buttonre.type="button";
    buttonre.style.backgroundColor = "black";
    buttonre.style.padding = "1em 1.5em";
    buttonre.style.marginLeft = "25px";

    li.setAttribute('data-id', user.id);
    tdname.textContent = user.data().date;
    tdidnumbeer.textContent = user.data().expensetitle;
    tddob.textContent = user.data().expenseamount;
    extitle.textContent = user.data().expensecategory;
    buttonex.textContent = "Delete This";
    buttonex.value = "Delete";
    buttonre.value = "Reload Page";
    buttonex.onclick = function(){
        var userid = user.id;
        if (deletedata.doc(userid).delete()){
            setTimeout(function(){
                    location.reload(); },
                1500);
        }
    }
    divcontainer.appendChild(tdname);
    divcontainer.appendChild(tdidnumbeer);
    divcontainer.appendChild(extitle);
    divcontainer.appendChild(tddob);
    divcontainer.appendChild(buttonex);

    li.appendChild(divcontainer);
    userListex.appendChild(li);

}

const queryforlistex = expensesubcollection.orderBy('date','desc');
queryforlistex.get().then(snapshot => {
    snapshot.forEach(user => {
        console.log(user.id);
        renderincomelistex(user);
    });

});

searchbtncategoryex.addEventListener('click', e => {
    e.preventDefault();
    var  searchbycategory = document.getElementById('category').value;

    var  datestart = document.getElementById('datestart').value;
    var  dateend = document.getElementById('dateend').value;
    document.getElementById('showexpenselist').innerHTML="";
    console.log("date");

///////////////////////////////////////////////////////////////////////////////

    if (searchbycategory !=="" && datestart===""){
        const query = expensesubcollection.where('expensecategory', '==', searchbycategory);
        query.get().then(snapshot => {
            snapshot.forEach(user => {
                renderincomelistex(user);
            });
        })
            .catch(error => {
                console.error(error);
            });

    }
    else if(searchbycategory !=="" && datestart!==""){
        console.log("date and category");
        const query = expensesubcollection.where('expensecategory', '==', searchbycategory).where('date','>=',datestart)
            .where('date','<=',dateend);
        query.get().then(snapshot => {
            snapshot.forEach(user => {
                renderincomelistex(user);
            });
        })
            .catch(error => {
                console.error(error);
            });
    }

    else {
        console.log("date");
        const query = expensesubcollection.where('date','>=',datestart)
            .where('date','<=',dateend);
        query.get().then(snapshot => {
            snapshot.forEach(user => {
                renderincomelistex(user);
            });
        })
            .catch(error => {
                console.error(error);
            });
    }





});