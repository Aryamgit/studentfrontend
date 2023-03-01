import React,{useEffect,useState} from 'react'

  

import { makeStyles,} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container,Paper,Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
     
    },
  },
}));

export default function Student() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[name,setName]=useState('')
    const[dob,setDob]=useState('') 
   // const options = ['One', 'Two', 'Three', 'Four', 'Five'];
    

    const[classes,setClasses]=useState('')
    const[division,setDivision]=useState('') 
    const[gender,setGender]=useState('') 
    const[students,setStudents]=useState([])
    const classess = useStyles();
    const handleClick=(e)=>{
        e.preventDefault()
        const student={name,dob,classes,division,gender}
        console.log(student)
        fetch("http://localhost:1010/student/add",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(student)

  }).then(()=>{
    console.log("New Student added")
  })
    }
    useEffect(()=>{
        fetch("http://localhost:1010/student/getAll")
        .then(res=>res.json())
        .then((result)=>{
          setStudents(result);
        }
      )
      },[])
    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"blue"}}><u>Add Student</u></h1>
        <form className={classess.root} noValidate autoComplete="off">
    
<TextField id="outlined-basic" variant="outlined" label="Student Name" fullWidth value={name}  
      onChange={(e)=>setName(e.target.value)}/>
     <TextField id="outlined-basic" type="date" variant="outlined" fullWidth value={dob}
      onChange={(e)=>setDob(e.target.value)}
      />
      
<select name="classes"  style={{width:"600px",height:"55px"}}>
<option selected disabled>Student Class</option>
 <option value="I">I</option>
 <option value="II"> II</option>
 <option value="III">III</option>
 <option value="IV">IV</option>
 <option value="V">V</option>
 <option value=" V1">V1</option>
 <option value="V11">V11</option>
 <option value="V111">V111</option>
 <option value="1X">1X</option>
 <option value="X">X</option>
 <option value="X11">X11</option>
 <option value="X12">X12</option>
onChange={(e)=>setClasses(e.target.value)}</select>

<select name="division" id="division"  style={{width:"600px",height:"55px"}}>
<option selected disabled>Student Division</option>
<option value="A">A</option>
 <option value="B">B</option>
 <option value="C">C</option>
 onChange={(e)=>setDivision(e.target.value)}
</select>
<label>Gender:</label>
<input type="radio" name="gender" value="male" checked={gender==="male"} onChange={(e)=>setGender(e.target.value)}
/><label htmlFor='male'>Male</label>


<input type="radio" name="gender" value="female" checked={gender==="female"} onChange={(e)=>setGender(e.target.value)}
/><label htmlFor='female'>Female</label>

<br></br>
      <Button variant="contained" color="secondary"  onClick={handleClick}>
  Submit
</Button>
      </form>
      </Paper>
      <h1>Students</h1>
      <Paper elevation={3} style={paperStyle}>

      {students.map(student=>(
        <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={student.id}>
         Id:{student.id}<br/>
         Name:{student.name}<br/>
         Date of Birth:{student.dob}<br/>
         Class:{student.classes}<br/>
         Division:{student.division}<br/>
         Gender:{student.gender}<br/>

        </Paper>
        ))
      }
      </Paper>
      </Container>
    );
    
}