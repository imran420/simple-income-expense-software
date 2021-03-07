const id = document.getElementById('id').innerHTML;
const database = firebase.firestore();
const maincollection = database.collection('accounts');
const duesubcollection = maincollection.doc('3').collection('due');
const duetoincomesubcollection = maincollection.doc('1').collection('income');
const date = moment().format("YYYY-MM-DD");
const time = moment().format("hh:mm:ss a");
console.log(id);
const queryfordue = duesubcollection.where('id','==',id);

queryfordue.get().then(snapshot => {
    snapshot.forEach(user => {
        const newpaid = user.data().incomeamount;
        duetoincomesubcollection.doc(id).set({
            paidamount: newpaid,
            dueamount: ""
        },{merge:true})
            .then(()=>{
                console.log("data has been saved in income subcollection");
                duesubcollection.doc(id).delete();
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
