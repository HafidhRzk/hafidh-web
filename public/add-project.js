let projects = []

function addProject() {

    let title = document.getElementById('input-project-title').value;
    let content = document.getElementById('input-project-content').value;
    let image = document.getElementById('input-project-image').files[0]
    let techno = document.getElementsByName('techno');
    let x=0;
    let tech= Array();

    let printTech='';

    for(let centang of techno){
      if(centang.checked == true){
        tech[x]=centang.value; x++
        printTech += '<i class="'+centang.value+'"></i>';
      }
    }

    image = URL.createObjectURL(image)

    let project = {
        title: title,
        content: content,
        image: image,
        tech: printTech,
        postedAt: new Date(),
    }

    projects.push(project)

    renderProject()
}

function renderProject() {

    let projectContainer = document.getElementById('contents')
    console.log(projects)

    projectContainer.innerHTML = 
    `<div class="container">
    <div class="row">
    <div class="col-4 px-3 py-3">
      <div class="card shadow" style="width: 21rem;">
        <img src="assets/project-img.jpg" class="card-img-top px-3 py-3" alt=""/>
        <div class="card-body">
            <a class="card-title" style="text-decoration:none; color:black" 
            href="project-detail.html" target="_blank"><h5>Dumbways Mobile App 2021</h5>
            </a>
            <p style="color: grey">Durasi : 3 Month</p>
            <p class="card-text">App that used for Dumbways student, it was deployed and can downloaded on play store. 
                happy download
            </p>
            <div class="fs-3">
                <i class="fa-brands fa-google-play pe-3"></i>
                <i class="fa-brands fa-android pe-3"></i>
                <i class="fa-brands fa-java pe-3"></i>
            </div>
            <a href="#" class="btn btn-dark btn-project">Edit</a>
            <a href="#" class="btn btn-dark btn-project">Delete</a>
        </div>
      </div>
    </div>
    <div class="col-4 px-3 py-3">
      <div class="card shadow" style="width: 21rem;">
        <img src="assets/project-img.jpg" class="card-img-top px-3 py-3" alt=""/>
        <div class="card-body">
            <a class="card-title" style="text-decoration:none; color:black" 
            href="project-detail.html" target="_blank"><h5>Dumbways Mobile App 2021</h5>
            </a>
            <p style="color: grey">Durasi : 3 Month</p>
            <p class="card-text">App that used for Dumbways student, it was deployed and can downloaded on play store. 
                happy download
            </p>
            <div class="fs-3">
                <i class="fa-brands fa-google-play pe-3"></i>
                <i class="fa-brands fa-android pe-3"></i>
                <i class="fa-brands fa-java pe-3"></i>
            </div>
            <a href="#" class="btn btn-dark btn-project">Edit</a>
            <a href="#" class="btn btn-dark btn-project">Delete</a>
        </div>
      </div>
    </div>
    <div class="col-4 px-3 py-3">
      <div class="card shadow" style="width: 21rem;">
        <img src="assets/project-img.jpg" class="card-img-top px-3 py-3" alt=""/>
        <div class="card-body">
            <a class="card-title" style="text-decoration:none; color:black" 
            href="project-detail.html" target="_blank"><h5>Dumbways Mobile App 2021</h5>
            </a>
            <p style="color: grey">Durasi : 3 Month</p>
            <p class="card-text">App that used for Dumbways student, it was deployed and can downloaded on play store. 
                happy download
            </p>
            <div class="fs-3">
                <i class="fa-brands fa-google-play pe-3"></i>
                <i class="fa-brands fa-android pe-3"></i>
                <i class="fa-brands fa-java pe-3"></i>
            </div>
            <a href="#" class="btn btn-dark btn-project">Edit</a>
            <a href="#" class="btn btn-dark btn-project">Delete</a>
        </div>
      </div>
    </div>
    <div class="col-4 px-3 py-3">
      <div class="card shadow" style="width: 21rem;">
        <img src="assets/project-img.jpg" class="card-img-top px-3 py-3" alt=""/>
        <div class="card-body">
            <a class="card-title" style="text-decoration:none; color:black" 
            href="project-detail.html" target="_blank"><h5>Dumbways Mobile App 2021</h5>
            </a>
            <p style="color: grey">Durasi : 3 Month</p>
            <p class="card-text">App that used for Dumbways student, it was deployed and can downloaded on play store. 
                happy download
            </p>
            <div class="fs-3">
                <i class="fa-brands fa-google-play pe-3"></i>
                <i class="fa-brands fa-android pe-3"></i>
                <i class="fa-brands fa-java pe-3"></i>
            </div>
            <a href="#" class="btn btn-dark btn-project">Edit</a>
            <a href="#" class="btn btn-dark btn-project">Delete</a>
        </div>
      </div>
    </div>
    <div class="col-4 px-3 py-3">
      <div class="card shadow" style="width: 21rem;">
        <img src="assets/project-img.jpg" class="card-img-top px-3 py-3" alt=""/>
        <div class="card-body">
            <a class="card-title" style="text-decoration:none; color:black" 
            href="project-detail.html" target="_blank"><h5>Dumbways Mobile App 2021</h5>
            </a>
            <p style="color: grey">Durasi : 3 Month</p>
            <p class="card-text">App that used for Dumbways student, it was deployed and can downloaded on play store. 
                happy download
            </p>
            <div class="fs-3">
                <i class="fa-brands fa-google-play pe-3"></i>
                <i class="fa-brands fa-android pe-3"></i>
                <i class="fa-brands fa-java pe-3"></i>
            </div>
            <a href="#" class="btn btn-dark btn-project">Edit</a>
            <a href="#" class="btn btn-dark btn-project">Delete</a>
        </div>
      </div>
    </div>
    </div>
    </div>`

    for(let i = 0; i < projects.length; i++) {
        projectContainer.innerHTML += 
        `<div class="col-4 px-3 py-3">
        <div class="card shadow" style="width: 21rem;">
          <img src="${projects[i].image}" class="card-img-top px-3 py-3" alt=""/>
          <div class="card-body">
              <a class="card-title" style="text-decoration:none; color:black" 
              href="project-detail.html" target="_blank"><h5>${projects[i].title}</h5>
              </a>
              <p style="color: grey">Durasi : ${getDurationTime(projects[i].duration)}</p>
              <div style="text-align: right; color: grey;">${getDistanceTime(projects[i].postedAt)}</div>
              <p class="card-text">${projects[i].content}</p>
              <div class="fs-3">
              ${projects[i].tech}
              </div>
              <a href="#" class="btn btn-dark btn-project">Edit</a>
              <a href="#" class="btn btn-dark btn-project">Delete</a>
          </div>
        </div>
      </div>`
    }
}

function getDistanceTime(time) {
  let timeNow = new Date()
  let timeBlog = new Date(time)

  let distance = timeNow - timeBlog

  let dayDistance = Math.floor(distance / (24 * 60 * 60 * 1000))

  if(dayDistance != 0){
    return dayDistance + ' day ago'
  }else {
    let hourDistance = Math.floor(distance / (60 * 60 * 1000))
    
    if(hourDistance != 0) {
      return hourDistance + ' hours ago'
    }else {
      let minuteDistance = Math.floor(distance / (60 * 1000))

      if(minuteDistance != 0){
        return minuteDistance + ' minutes ago'
      } else {
        let secondsDistance = Math.floor(distance / 1000)

        return secondsDistance + ' second ago'
      }
    }
  }
}

function getDurationTime() {

  let startDate = document.getElementById('start-date').value;
  let endDate = document.getElementById('end-date').value;

  let timeStart = new Date(startDate);
  let timeEnd = new Date(endDate);

  let duration = timeEnd - timeStart
  
  let yearDuration = Math.floor(duration / (12 * 30 * 24 * 60 * 60 * 1000))

    if(yearDuration != 0){
      return yearDuration + ' Year'
    }else {
      let monthDuration = Math.floor(duration / (30 * 24 * 60 * 60 * 1000))
      
      if(monthDuration != 0) {
        return monthDuration + ' Months'
      }else {
        let dayDuration = Math.floor(duration / (24 * 60 * 60 * 1000))

        if(dayDuration != 0){
          return dayDuration + ' Days'
        }
      }
    }
}

setInterval(function(){
  renderProject()
}, 1000)