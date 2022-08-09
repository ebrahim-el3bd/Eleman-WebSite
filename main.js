// *--------------------------------------------------
//*Start Explore Button
let exploreBtn = document.querySelector('.title .btn'),
    HadithSection = document.querySelector('.hadith');
exploreBtn.addEventListener('click',()=>{
    HadithSection.scrollIntoView({
        behavior : "smooth"
    })
})
//*End Explore Button
// *--------------------------------------------------


// *--------------------------------------------------
//*Start NavBar
let fixedNav = document.querySelector('.header'),
     scrollBtn = document.querySelector('.scrollBtn');
window.addEventListener("scroll",()=>{
    window.scrollY > 100 ? fixedNav.classList.add('active') : fixedNav.classList.remove('active');
    window.scrollY > 500 ?  scrollBtn.classList.add('active') : scrollBtn.classList.remove('active') ;
})
scrollBtn.addEventListener('click',()=>{
    window.scrollTo({
        top : 0,
        behavior : "smooth"
    })
})
//*End NavBar
// *--------------------------------------------------




// *--------------------------------------------------
//* Start Hadith Changer

let hadithContainer = document.querySelector('.hadithContainer'),
    next = document.querySelector('.buttons .next'),
    prev = document.querySelector('.buttons .prev'),
    number = document.querySelector('.buttons .number');
    let hadithIndex = 0;
    //* End Hadith Changer
// *--------------------------------------------------


// *--------------------------------------------------
//* Start Hadith Changer (API)
HadithChanger();
function HadithChanger()
{
    fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-abudawud.json")
    .then(response => response.json())
    .then(data =>{
        
        let Hadiths = data.hadiths;
        changeHadith();
        next.addEventListener('click',()=>{
            hadithIndex == 5274 ? hadithIndex = 0 : hadithIndex++;
            changeHadith()
        })
        prev.addEventListener('click',()=>{
            hadithIndex == 0 ? hadithIndex = 5274 : hadithIndex--;
            changeHadith()
        })
        function changeHadith()
        {
            hadithContainer.innerText = Hadiths[hadithIndex].text;
            number.innerText = `5274  -  ${hadithIndex + 1}`
        }
    })
}
//* End Hadith Changer(API)
// *--------------------------------------------------


// *------------------------------------------------------
//*Start Link Section Connect From nav BarLink To Section
let sections = document.querySelectorAll("section"),
    links = document.querySelectorAll('.header ul li');
links.forEach(link => {
    link.addEventListener('click',()=>{
        document.querySelector('.header ul li.active').classList.remove('active');
        link.classList.add('active');
        let target = link.dataset.filter;
        sections.forEach(section=>{
            if(section.classList.contains(target))
            {
                section.scrollIntoView({
                    behavior : "smooth"
                })
            }
        })
    })
})

//*End Link Section Connect From nav BarLink To Section
// *----------------------------------------------------


// *------------------------------------------------------
//*Start Surah APi
let SurahsContainer = document.querySelector('.surhasContainer');
getSurahs()

function getSurahs()
{
    //fetch Surahs meta data {Name of SuraHS}
    fetch("http://api.alquran.cloud/v1/meta")
    .then(response => response.json())
    .then(data=>{
        let surahs = data.data.surahs.references;
        let numberOfSurahs = 114;
        SurahsContainer.innerHTML = "";
        for (let i = 0; i < numberOfSurahs ; i++) {
            
            SurahsContainer.innerHTML += 
                `
                    <div class="surah">
                        <p>${surahs[i].name}</p>
                        <p>${surahs[i].englishName}</p>
                    </div>
                `
        }
        let SurahsTitels = document.querySelectorAll('.surah');
        let popup = document.querySelector('.surah-popup'),
            AyatContainer = document.querySelector('.ayat');
        SurahsTitels.forEach((title,index)=>{
            title.addEventListener('click',()=>{
                fetch(`http://api.alquran.cloud/v1/surah/${index + 1}`)
                .then(response => response.json())
                .then(data=>{
                    AyatContainer.innerHTML = "";
                    let Ayat = data.data.ayahs;
                    Ayat.forEach(aya=>{
                        popup.classList.add('active');
                        AyatContainer.innerHTML += `
                            <p>(${aya.numberInSurah}) - ${aya.text}</p>
                        `
                    })
                    
                })
            })
        })
        let closePopup = document.querySelector('.close-popup');
        closePopup.addEventListener('click',()=>{
            popup.classList.remove('active');
        })
    })   
}

//*End Surah APi
// *------------------------------------------------------




// *------------------------------------------------------
//*Start Awkat Elsalah

let cards = document.querySelector('.cards');
getPrayTimes();
function getPrayTimes()
{
    fetch("http://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt&method=8")
    .then(response => response.json())
    .then(data =>{
        let times = data.data.timings;
        cards.innerHTML = "";
        for (let time in times)
        {
            
            cards.innerHTML+= 
            `
                <div class="card">
                    <div class="circle">
                        <svg>
                            <Circle cx="100" cy = "100" r ="100"></Circle>
                        </svg>
                        <div class="praytime">${times[time]}</div>
                    </div>
                    <p>${time}</p>
                </div>
            `
        }
    })
}

//*End Awkat Elsalah
// *------------------------------------------------------

// *------------------------------------------------------
//*Start Active SideBar
let bars = document.querySelector('.bars'),
    SideBar = document.querySelector('.header ul');
bars.addEventListener('click',()=>{
    SideBar.classList.toggle("active");
})

//*End Active SideBar
// *------------------------------------------------------

// *------------------------------------------------------
//*Start Active SideBar

$(document).ready(function(){
    $(".loading .lds-ring").fadeOut(2000,function(){
        $(".loading").fadeOut(1000)
    })
})





//*End Active SideBar
// *------------------------------------------------------