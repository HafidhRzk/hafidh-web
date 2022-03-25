const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');

const db = require('./connection/db');
const upload = require('./middlewares/uploadFile');

db.connect(function (err, _, done) {
  if (err) throw err;

  console.log('Database Connection Success');
  done();
});

const app = express();
const PORT = process.env.PORT || 2025;

const isLogin = false;

let projects = [];

app.use(flash());
app.set('view engine', 'hbs');
app.use(
  session({
    secret: 'rahasia',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 5 },
  })
);

app.use('/public', express.static(__dirname + '/public'));
app.use('/filestorage', express.static(__dirname + '/filestorage'));
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  db.connect(function (err, client, done) {
    let query = '';

    if (req.session.isLogin) {
      query = `SELECT tb_project.*, tb_user.id AS "user_id", tb_user.name, tb_user.email 
                FROM tb_project LEFT JOIN tb_user 
                ON tb_user.id = tb_project.author_id WHERE tb_user.id=${req.session.user.id}`;
    } else {
      query = `SELECT tb_project.*, tb_user.id AS "user_id", tb_user.name, tb_user.email 
                FROM tb_project LEFT JOIN tb_user 
                ON tb_user.id = tb_project.author_id`;
    }

    client.query(query, function (err, result) {
      if (err) throw err;
      done();

    let data = result.rows;
    // console.log(result.rows);

    let dataProjects = data.map(function (data) {
      let techno = data.technologies;
      let tech='';
      for(var i=0; i<techno.length; i++){
        tech += '<i class="'+techno[i]+'"></i>';
      }

        let user_id = data.user_id;
        let name = data.name;
        let email = data.email;

        delete data.user_id;
        delete data.name;
        delete data.email;
        delete data.author_id;

        const PATH = 'http://localhost:2025/filestorage/';

    return {
      ...data,
      post_at: getFullTime(data.posted_at),
      distance: getDistanceTime(data.posted_at),
      duration: getDurationTime(new Date(data.startDate), new Date(data.endDate)),
      author: {
        user_id,
        name,
        email
      },
      isLogin: req.session.isLogin,
      image: PATH + data.image,
      tech: tech,
  };
  });
  // console.log(dataProjects);
  // console.log(post_at);
  // console.log(distance);
  // console.log(duration);
  res.render('index', {user: req.session.user,
    isLogin: req.session.isLogin, 
    projects: dataProjects});
    });
  });
});

app.post('/', upload.single('image'), function (req, res) {

    let data = req.body;

    if (data.title == '' || data.start_date == '' || data.end_date == '' 
    || data.description == '' || data.technologies == ''|| data.image == '') {
      return res.redirect('/add-project');
    }
  
    db.connect(function (err, client, done) {
      if (err) throw err;

      let month = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      let time = new Date();
      let date = time.getDate();
      let monthIndex = time.getMonth();
      let year = time.getFullYear();

      let hour = time.getHours();
      let minute = time.getMinutes();
      let seconds = time.getSeconds();

      let posted_at = `${year}-${month[monthIndex]}-${date} ${hour}:${minute}:${seconds}`;

      console.log(posted_at);
  
      const query = `INSERT INTO public.tb_project(title, start_date, end_date, 
        description, technologies, image, author_id, posted_at) VALUES
      ('${data.title}','${data.start_date}','${data.end_date}',
      '${data.description}', '{${data.technologies}}', '${req.file.filename}', '${req.session.user.id}',
      '{${posted_at}}')`;

      client.query(query, function (err) {
        if (err) throw err;
        done();
      });
    });
    res.redirect('/');
});

app.get('/project-delete/:id', function (req, res) {
    let id = req.params.id;

    db.connect(function (err, client, done) {
      if (err) throw err;
      const query = `DELETE FROM public.tb_project WHERE id=${id}`;
  
      client.query(query, function (err, result) {
        if (err) throw err;
        done();
      });
    });

    res.redirect('/');
});

app.get('/contact', function (req, res) {
    res.render('contact', {isLogin});
});

app.get('/add-project', function (req, res) {
    res.render('add-project', {user: req.session.user,
      isLogin: req.session.isLogin,});
});

app.get('/register', function (req, res) {
  res.render('register');
});

app.post('/register', function (req, res) {
  const data = req.body;

  if (data.name == '' || data.email == '' || data.password == '') {
    req.flash('error', 'Tolong Diisi Semua!');
    return res.redirect('/register');
  }

  const hashedPassword = bcrypt.hashSync(data.password, 10);

  db.connect(function (err, client, done) {
    if (err) throw err;

    const query = `INSERT INTO tb_user(name,email,password) VALUES ('${data.name}','${data.email}','${hashedPassword}')`;

    client.query(query, function (err, result) {
      if (err) throw err;

      req.flash('success', 'Anda Berhasil Mendaftar!');
      res.redirect('/login');
    });
  });
});

app.get('/login', function (req, res) {
  res.render('login');
});

app.post('/login', function (req, res) {
  const data = req.body;

  if (data.email == '' || data.password == '') {
    req.flash('error', 'Tolong Diisi Semua!');
    return res.redirect('/login');
  }

  db.connect(function (err, client, done) {
    if (err) throw err;

    const query = `SELECT * FROM tb_user WHERE email = '${data.email}'`;

    client.query(query, function (err, result) {
      if (err) throw err;

      if (result.rows.length == 0) {
        console.log('Email not found!');
        return res.redirect('/login');
      }

      const isMatch = bcrypt.compareSync(
        data.password,
        result.rows[0].password
      );

      if (isMatch == false) {
        console.log('Wrong Password!');
        return res.redirect('/login');
      }

      req.session.isLogin = true;
      req.session.user = {
        id: result.rows[0].id,
        email: result.rows[0].email,
        name: result.rows[0].name,
      };
      res.redirect('/');
    });
  });
});

app.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/');
});

app.get('/update-project/:id', function (req, res) {

    let id = req.params.id;
    let project = projects[id];

    res.render('update-project', {project});
});

// app.post('/update-project', function (req, res) {

//   let data = req.body;
//   let id = req.params.id;

//     if (data.title == '' || data.start_date == '' || data.end_date == '' 
//     || data.description == '' || data.technologies == ''|| data.image == '') {
//       return res.redirect('/add-project');
//     }
  
//     db.connect(function (err, client, done) {
//       if (err) throw err;
  
//       const query = `UPDATE tb_project
//       SET title='${data.title}', start_date="${data.start_date}", end_date="${data.end_date}",
//       description='${data.description}', technologies='{${data.technologies}}', image='${data.image}' WHERE id=${id}`;

//       console.log(query);

//       client.query(query, function (err) {
//         if (err) throw err;
//         done();
//       });
//     });
//   res.redirect('/');
// });

app.get('/project-detail/:id', function (req, res) {

    let id = req.params.id;

    db.connect(function (err, client, done) {
      const query = `SELECT tb_project.*, tb_user.id AS "user_id", tb_user.name, tb_user.email 
                    FROM tb_project LEFT JOIN tb_user 
                    ON tb_user.id = tb_project.author_id 
                    WHERE tb_project.id=${id}`;
  
      client.query(query, function (err, result) {
        if (err) throw err;
        done();
  
        let data = result.rows[0];
  
        data = {
          ...data,
          posted_at: new Date(),
          post_at: getFullTime(posted_at),
          distance: getDistanceTime(data.posted_at),
          duration: getDurationTime(new Date(data.startDate), new Date(data.endDate)),
          author: {
            user_id: data.user_id,
            name: data.name,
            email: data.email,
          },
        };

        delete data.user_id;
        delete data.name;
        delete data.email;
        delete data.author_id;

    res.render('project-detail', {project: data});
    });
  });
});

app.listen(PORT, function () {
    console.log(`Server starting on PORT: ${PORT}`);
});

function getFullTime(time) {
    let month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    let times = new Date(time);
    let date = times.getDate();
    let monthIndex = times.getMonth();
    let year = times.getFullYear();
  
    let hour = times.getHours();
    let minute = times.getMinutes();
    let seconds = times.getSeconds();
  
    let fullTime = `${date} ${month[monthIndex]} ${year} ${hour}:${minute}:${seconds} WIB`;
  
    return fullTime;
};

function getDistanceTime(time) {
    let timeNow = new Date();
    let timePost = new Date(time);
  
    let distance = timeNow - timePost;
  
    let dayDistance = Math.floor(distance / (24 * 60 * 60 * 1000));
  
    if (dayDistance != 0) {
      return dayDistance + ' day ago';
    } else {
      let hourDistance = Math.floor(distance / (60 * 60 * 1000));
  
      if (hourDistance != 0) {
        return hourDistance + ' hours ago';
      } else {
        let minuteDistance = Math.floor(distance / (60 * 1000));
  
        if (minuteDistance != 0) {
          return minuteDistance + ' minutes ago';
        } else {
          let secondsDistance = Math.floor(distance / 1000);
  
          return secondsDistance + ' second ago';
        }
      }
    }
};

function getDurationTime(start_date, end_date) {

  // let start_date = new Date();
  // let end_date = new Date();
  let timeStart = Date.now(start_date);
  let timeEnd = Date.now(end_date);

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
};
