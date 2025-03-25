const nodemailer = require("nodemailer");
const Faculty = require("../models/FacultySchema");
const Team = require("../models/TeamSchema");

require("dotenv").config();

exports.facultyList= async(req,res)=>{
    try {
        const mentors=await Faculty.find()
        console.log("Fetched mentors:", mentors);
        res.status(200).json(mentors)
    } catch (error) {
        res.status(500).json({message:'Error'})
    }
}

exports.getsortedFaculty= async(req,res)=>{
    try {
        const faculty=await Faculty.find().sort({Name:1})
        res.status(200).json(faculty)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

exports.getFacultyByDomain = async (req, res) => {
    try {
        const { domain } = req.query;  
        if (!domain) {
            return res.status(400).json({ message: "Domain query is required" });
        }

        console.log("API hit with domain:", domain); 

        
        const facultyList = await Faculty.find({
            $or: [
                { Domain1: { $regex: domain, $options: 'i' } },
                { Domain2: { $regex: domain, $options: 'i' } },
                { Domain3: { $regex: domain, $options: 'i' } }
            ]
        });

       
        const sortedFaculty = facultyList.sort((a, b) => {
            if (a.Name === "Dr. Sandesh B J") return -1; 
            if (b.Name === "Dr. Sandesh B J") return 1;

            const rankOrder = {
                "Professor":1,
                "Associate Professor":2,
                "Assistant Professor":3
            };

            return (rankOrder[a.Designation] || 4) - (rankOrder[b.Designation] || 4);
        });

        if(!sortedFaculty){
            throw new Error("some error occured")
        }

        res.status(200).json(sortedFaculty);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendMailtoMentor = async (req, res) => {
  try {
    const { teamMembers, domainsofInterest,mentorEmail } = req.body;

    let teamDetails = "";
    teamMembers.forEach((member, index) => {
      teamDetails += `
        <li>
          <strong>Team Member ${index + 1}:</strong><br>
          Name: ${member.name}<br>
          SRN: ${member.srn}<br>
          Section: ${member.section}<br>
          CGPA: ${member.cgpa}<br>
        </li><br>
      `;
    });

    const emailContent = `
      <p>Dear Mentor,</p>
  
  <p>I hope you're doing well. A team of students has invited you to mentor them for their capstone project.</p>

  <h3>Team Details:</h3>
  <ul>${teamDetails}</ul>

  <h3>Domains of Interest:</h3>
  <p>${domainsofInterest.join(", ")}</p>

  <p>Please log in to the <strong>Mentor Portal</strong> to accept or decline this request.</p>

  <p><a href="https://your-mentor-portal-link.com" style="color: blue; text-decoration: underline;">
  Click here to access the Mentor Portal</a></p>

  <p>Best regards,<br><strong>PES University Team</strong></p>
`;

    const mailOptions={
        from: process.env.EMAIL,
        to: mentorEmail, 
        subject: "Capstone Project Mentorship Request",
        html: emailContent,
    }

    await transporter.sendMail(mailOptions)

    console.log("Sending email to:", mentorEmail);
console.log("Mail options:", mailOptions);

    res.status(200).json({message:"Email sent successfully"})
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Internal Server Error"})
  }
};
