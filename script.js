/* Kullanıcılar */
let users = [
    {username: "admin", password: "1234", role:"admin"},
    {username: "Ali", password: "abcd", role:"user"},
    {username: "Ayşe", password: "pass", role:"user"}
];

/* Giriş / Kayıt */
const form = document.getElementById('loginForm');
if(form){
    const message = document.getElementById('message');
    form.addEventListener('submit', function(e){
        e.preventDefault();
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        let user = users.find(u => u.username === username && u.password === password);
        if(user){
            message.style.color = "green";
            message.innerText = "Giriş başarılı! Hoşgeldiniz, " + user.username;
            if(user.role === "admin"){
                document.getElementById("sortBtn").style.display = "inline-block";
                // contenteditable açılıyor (sadece admin)
                let tds = document.querySelectorAll("#leaderboard td:nth-child(2), #leaderboard td:nth-child(3)");
                tds.forEach(td => td.setAttribute("contenteditable","true"));
            }
        } else {
            message.style.color = "red";
            message.innerText = "Kullanıcı adı veya şifre yanlış!";
        }
    });
}

/* Liderlik Tablosu Sıralama */
function sortLeaderboard(){
    let table = document.getElementById("leaderboard").getElementsByTagName('tbody')[0];
    let rows = Array.from(table.rows);
    rows.sort((a,b) => parseInt(b.cells[2].innerText) - parseInt(a.cells[2].innerText));
    rows.forEach((row,index) => { row.cells[0].innerText = index+1; table.appendChild(row); });
}

/* Sıralama butonunu admin dışında gizle */
if(document.getElementById("sortBtn")){
    document.getElementById("sortBtn").addEventListener("click", sortLeaderboard);
}
