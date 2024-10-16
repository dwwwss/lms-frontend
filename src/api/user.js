import {
  BASE_URL,
  API,
  USER,
  AUTHENTICATE,
  UPDATE,
  ADD,
  UPDATEPASSWORD,
  COUNT,
  FORGOTPASSWORD,
  DESIGNATION,
  COURSES,
  COURSE,
  TRAININGPLAN,
  DELETE,
  TRAININGPLANCOURSES,
  UPDATEASSIGNEDTRAININGPLAN,
  ASSIGNEDTRAININGPLANSTATUS,
  ADDTRAININGPLANCOURSES,
  GETUSERTRAININGPLAN,
  ASSIGNTPTOUSER,
  GETPROGRESSTP,
  GETPROFILEPIC,
  UPLOADPROFILEPIC,
  ID,
  VALIDATETOKEN,
  DESIGNATIONS,
  UPDATES,
  ROLE,
  UPDATESTATUSTP,

  USERASSIGNEDCOURSES,
  TRAININGCOURSE,
  ADMINTRAININGPLANCOURSES,

} from "./apiconstants";

import Api from ".";
const token = localStorage.getItem("token");

// lOGIN
export function login(email, password) {
  var url = `${BASE_URL}${API}${USER}${AUTHENTICATE}?Email=${encodeURIComponent(email)}&Password=${encodeURIComponent(password)}`;
  var data = {
    email: email,
    password: password,
  }
  var headers = {
    'content-Type': 'application/json',
  };
  return Api(url, 'POST', data, headers);
}

// GET ALL USER
export function userapi() {
  var url = BASE_URL + API + USER;
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  return Api(url, 'GET', headers);
}

// GET USER BY ID
export function myaccount(id) {
  var url = `${BASE_URL}${API}${USER}${id}`;
  var data = {
    id: id,
  }
  var headers = {
    'Content-Type': 'application/json',
  };
  return Api(url, 'GET', data, headers);
}

// UPDATE USER BY ID
export function updateuser(id, name, email, roleId, designation) {
  var url = `${BASE_URL}${API}${USER}${UPDATE}/${id}`;
  var data = {
    id: id,
    name: name,
    email: email,
    fkRoleId: roleId,
    fkDesignationId: designation,
  }
  var headers = {
    'Content-Type': 'application/json',
  };
  return Api(url, 'PUT', data, headers);
}

// UPDATE PROFILE BY ID
export function myaccountprofile(id, name, email, password) {
  var url = `${BASE_URL}${API}${USER}${id}`;
  var data = {
    id: id,
    name: name,
    email: email,
    password: password,
  }
  var headers = {
    'Content-Type': 'application/json',
  };
  return Api(url, 'PUT', data, headers);
}

// UPDATE PASSWORD
export function updatepassword(userpassword) {
  var url = `${BASE_URL}${API}${USER}${UPDATEPASSWORD}${userpassword.id}`;
  var data = {
    id: userpassword.id,
    newPassword: userpassword.newPassword,
    currentPassword: userpassword.currentPassword,
  }
  var headers = {
    'Content-Type': 'application/json',
  };
  return Api(url, 'PUT', data, headers);
}

// GET COUNT (ADMIN PANEL)
export function countapi() {
  var url = BASE_URL + API + USER + COUNT;

  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded',

  };
  return Api(url, 'GET', headers);

}
// FORGOT PASSWORD
export function forgotpassword(email) {
  const url = BASE_URL + API + USER + FORGOTPASSWORD;
  const data = {
    email: email
  };
  const headers = {
    'Content-Type': 'application/json',
  };
  return Api(url, 'POST', data, headers)
}

// GET ALL DESIGNATION (LIST)
export function designations() {
  var url = `${BASE_URL}${API}${USER}/${DESIGNATION}`;

  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  return Api(url, 'GET', headers);
}

// GET DESIGNATION BY ID
export function designationById(id) {
  var url = `${BASE_URL}${API}${USER}${DESIGNATION}/${id}`;
  var data = {
    id: id,
  }
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  return Api(url, 'GET', data, headers);
}

// ADD USER
export function adduser(name, email, role, designation) {
  var url = `${BASE_URL}${API}${USER}${ADD}`;
  var data = {
    Name: name,
    Email: email,
    RoleName: role,
    DesignationName: designation,
  }
  var headers = {
    'Content-Type': 'application/json',
  };
  return Api(url, 'POST', data, headers);
}

// DELETE USER
export function deleteuser(id) {
  var url = `${BASE_URL}${API}${USER}${DELETE}${id}`;
  var data = {
    id: id,
  }
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  return Api(url, 'DELETE', data, headers);
}

// ASSIGNED TP AND TPC
export function courseapi() {
  var url = BASE_URL + API + COURSES;

  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  return Api(url, 'GET', headers);
}

// GET ALL COURSE
export function getcourse() {
  var url =`${BASE_URL}${API}${COURSE}`;

  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  return Api(url, 'GET', headers);
}

// GET COURSE BY ID
export function getcourseid(id) {
  var url = `${BASE_URL}${API}${COURSE}/${id}`;
  var data = {
    id: id,
  }
  var headers = {
    'Content-Type': 'application/json',
  };
  return Api(url, 'GET', data, headers);
}

// ADD NEW COURSE
export function addcourse(title, description, videoLink, featuredImage) {
  var url = `${BASE_URL}${API}${COURSE}`;
  var data = {
    title: title,
    description: description,
    videoLink: videoLink,
    featuredImage: featuredImage
  }
  var headers = {
    'Content-Type': 'application/json',
  };
  return Api(url, 'POST', data, headers)
}

// UPDATE COURSE BY ID
export function updatecourse(id, title, description, videoLink, featuredImage) {
  var url = `${BASE_URL}${API}${COURSE}/${UPDATE}/${id}`;
  var data = {
    id: id,
    title: title,
    description: description,
    videoLink: videoLink,
    featuredImage: featuredImage
  }
  var headers = {
    'Content-Type': 'application/json',
  };
  return Api(url, 'PUT', data, headers)
}

// DELETE COURSE BY ID
export function deletecourse(id) {
  var url = `${BASE_URL}${API}${COURSE}/${id}`;
  var data = {
    id: id,
  }
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  return Api(url, 'DELETE', data, headers);
}

// GET TRAINING PLAN
export function gettrainingplan() {
  var url = `${BASE_URL}${API}${TRAININGPLAN}`;

  var headers = {
    'Content-Type': 'application/json',
  };
  return Api(url, 'GET', headers);
}

// DELETED TRAINING PLAN BY ID
export function deletertrainingplan(id) {
  var url = `${BASE_URL}${API}${TRAININGPLAN}${id}`;

  var data = {
    id: id,
  }
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  return Api(url, 'DELETE', data, headers);
}

// GET TRAINING PLAN BY ID
export function gettrainingbyid(id) {
  var url = `${BASE_URL}${API}${TRAININGPLAN}${TRAININGPLANCOURSES}${id}`; 
  var data = {
    id: id,
  }
  
  var headers = {
    'Content-Type': 'application/json',
  };
  return Api(url, 'GET', data, headers);
}

// UPDATE TRAINING PLAN BY ID
export function updatetraining(id, trainingPlanName, description, trainingPlanCourses, featuredImage) {
  var url = `${BASE_URL}${API}${TRAININGPLAN}${id}`;
  var data = {
    id: id,
    trainingPlanName: trainingPlanName,
    description: description,
    trainingPlanCourses:trainingPlanCourses,
    featuredImage: featuredImage

  }
  var headers = {
    'Content-Type': 'application/json',
  };
  return Api(url, 'PUT', data, headers)
}

// ADD TRAINING PLAN
export function addtraining(title, description, featuredImage) {
  var url = `${BASE_URL}${API}${TRAININGPLAN}`;
  var data = {
    trainingPlanName: title,
    description: description,
    featuredImage: featuredImage,
    // trainingPlanCourses: trainingPlanCourses,
  }
  var headers = {
    'Content-Type': 'application/json',
  };
  return Api(url, 'POST', data, headers)
}


// GET ASSIGNED TRAINING PLAN 
export function assignedTrainingPlan(id) {
  var url = `${BASE_URL}${API}${TRAININGPLAN}${GETUSERTRAININGPLAN}/${id}`
  var data = {
    id: id,
  }
  var headers = {
    'content-Type': 'application/x-www-form-urlencoded'
  };
  return Api(url, 'GET', data, headers);
}

// ASSIGN TRAINING PLAN TO USER (ADMIN)
// export function AssignTrainingPlanToUser(FkUserId, FkTrainingplanId) {
//   var url = `${BASE_URL}${API}${TRAININGPLAN}${ASSIGNTPTOUSER}`;
//   var data = {
//     FkUserId: FkUserId,
//     FkTrainingplanId: FkTrainingplanId
//   }
//   var headers = {
//     'Content-Type': 'application/json',
//   };
//   return Api(url, 'POST', data, headers)
// }

// GET PROGRESS OF TP
export function GetProgressTP(id) {
  var url = `${BASE_URL}${API}${TRAININGPLAN}${GETPROGRESSTP}/${id}`; 
  var data = {
    id: id,
  }
  
  var headers = {
    'Content-Type': 'application/json',
  };
  return Api(url, 'GET', data, headers);
}

// PUT API TO UPDATE STATUS 
export function statusUpdate( id ,FkCourseId, FkTrainingplanId, assigncoursestatus_id) {
  var url = `${BASE_URL}${API}${TRAININGPLAN}${ASSIGNEDTRAININGPLANSTATUS}${id}`;
  var data = { 
    FkCourseId: FkCourseId,
    FkTrainingplanId: FkTrainingplanId,
    assigncoursestatus_id: assigncoursestatus_id,
  }
  var headers = {
    'Content-Type': 'application/json',
  };
  return Api(url, 'PUT', [data], headers) 
}
// PUT API TO UPDATE PRIORITY 
export function priorityUpdate( id ,FkCourseId, FkTrainingplanId, assigncoursepriority_id) {
  var url = `${BASE_URL}${API}${TRAININGPLAN}${ASSIGNEDTRAININGPLANSTATUS}${id}`;
  var data = { 
    FkCourseId: FkCourseId,
    FkTrainingplanId: FkTrainingplanId,
    assigncoursepriority_id: assigncoursepriority_id,
  }
  var headers = {
    'Content-Type': 'application/json',
  };
  return Api(url, 'PUT', [data], headers) 
}



export function gettrainingcourseid(id) {
  var url = `${BASE_URL}${API}${TRAININGPLAN}${id}`;

  var data = {
    id: id,
  }

  var headers = {
    'Content-Type': 'application/json',
  };
  return Api(url, 'GET', data, headers);
}
export function assigncourseapi(id) {
  var url = `${BASE_URL}${API}${USERASSIGNEDCOURSES}/${COURSES}/${id}`;
  var data = {
    id: id
  }
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  return Api(url, 'GET', data, headers);

}

export function trainingPlancourse(id) {
  var url = `${BASE_URL}${API}${TRAININGPLAN}/${id}`;
  var data = {
    id: id,
  }
  var headers = {
    'content-Type': 'application/json'
  };
  return Api(url, 'GET', headers);

}
export function trainingcourse() {
  var url = BASE_URL + API + TRAININGCOURSE;
  var headers = {
    'content-Type': 'application/json'
  };
  return Api(url, 'GET', headers);

}

export function myaccountput2(id, name, email, password) {
  var url = `${BASE_URL}${API}${USER}${UPDATE}/${id}?name=${encodeURIComponent(name)}`;
  var data = {
    id: id,
    name: name,
    email: email,
    password: password,
  }
  var headers = {
    'Content-Type': 'application/json',
  };
  return Api(url, 'PUT', data, headers);
}



export function checkcourse(selectedTrainingPlan, id) {
  const url = `${BASE_URL}${API}${TRAININGPLAN}${UPDATEASSIGNEDTRAININGPLAN}${selectedTrainingPlan}`;
  const data = {
    fkPlanId: selectedTrainingPlan,
    fkCourseId: id,
  };
  const headers = {
    'Content-Type': 'application/json',
  };
  return Api(url, 'PUT', data, headers)
}
export function addTPcourse(selectedTrainingPlan, id) {
  const url = `${BASE_URL}${API}${TRAININGPLAN}${ADDTRAININGPLANCOURSES}`;
  const data = {
    trainingPlanId: selectedTrainingPlan,
    courseIds: [id],
  };
  const headers = {
    'Content-Type': 'application/json',
  };
  return Api(url, 'POST', data, headers)
}

export function deletetrainingcourse(id) {
  var url = `${BASE_URL}${API}${TRAININGPLAN}/${id}/${COURSES}`;
  var data = {
    id: id,
  }
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  return Api(url, 'DELETE', data, headers);
}


export function deletecoursetrainingplan(id, course) {
  var url = `${BASE_URL}${API}${ADMINTRAININGPLANCOURSES}${id}/${COURSES}?fkCourseId=${encodeURIComponent(course)}`;
  var data = {
    id: id,
    course: course,
  }
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  return Api(url, 'DELETE', data, headers);
}


// GET USER PROFILE PIC
export function myProfilePic(id) {
  var url = `${BASE_URL}${API}${USER}${id}/${GETPROFILEPIC}`;
  var data = {
    id: id,
  }
  var headers = {
    'Content-Type': 'image/jpg',
  };
  return Api(url, 'GET', data, headers);
}

// UPLOAD PROFILE PIC
export function UploadProfilePic(id, formData) {
  const url = `${BASE_URL}${API}${USER}${UPLOADPROFILEPIC}?${ID}=${id}`;
  var data = formData
  
  const headers = {
      'Content-Type': 'multipart/form-data',
    };
  return Api(url, 'POST', data, headers)
}

// VALIDATE TOKEN 
export async function validToken(token) {
  const url = `${BASE_URL}${API}${USER}${VALIDATETOKEN}`;
  const data = {
      token: token,
  };
  const headers = {
      'Content-Type': 'application/json',
  };

  try {
      const response = await Api(url, 'POST', data, headers);
      return response;
  } catch (error) {
      // Modify this part to throw a specific error when the token is invalid
      throw new Error('InvalidTokenError');
  }
}

// GET ALL DESIGNATION (LIST)
export function designation() {
  var url = `${BASE_URL}${API}${DESIGNATIONS}`;
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  return Api(url, 'GET', headers);
}

// GET DESIGNATION BY ID
export function designationsById(id) {
  var url = `${BASE_URL}${API}${DESIGNATIONS}/${id}`;
  var data = {
    id: id,
  }
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  return Api(url, 'GET', data, headers);
}

// ADD DESIGNATION
export function addDesignation(DesignationName, Description) {
  const url = `${BASE_URL}${API}${DESIGNATIONS}`;
  const data = {
    DesignationName: DesignationName,
    Description: Description 
  };
  const headers = {
    'Content-Type': 'application/json',
  };
  return Api(url, 'POST', data, headers)
}

//UPDATE DESIGNATION 
export function updateDesignation(id, DesignationName, Description) {
  const url = `${BASE_URL}${API}${DESIGNATIONS}/${UPDATES}/${id}`;
  const data = {
    id: id,
    DesignationName: DesignationName,
    Description: Description
  };
  const headers = {
    'Content-Type': 'application/json',
  };
  return Api(url, 'PUT', data, headers)
}

// DELETE DESIGNATION
export function deleteDesignation(id) {
  var url = `${BASE_URL}${API}${DESIGNATIONS}/${id}`;
  var data = {
    id: id,
  }
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  return Api(url, 'DELETE', data, headers);
}

// GET ALL ROLE (LIST)
export function role() {
  var url = `${BASE_URL}${API}${ROLE}`;
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  return Api(url, 'GET', headers);
}

// GET ROLE BY ID
export function roleById(id) {
  var url = `${BASE_URL}${API}${ROLE}/${id}`;
  var data = {
    id: id,
  }
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  return Api(url, 'GET', data, headers);
}

// ADD ROLE
export function addRole(RoleName, Description) {
  const url = `${BASE_URL}${API}${ROLE}`;
  const data = {
    RoleName: RoleName,
    Description: Description 
  };
  const headers = {
    'Content-Type': 'application/json',
  };
  return Api(url, 'POST', data, headers)
}

//UPDATE ROLE 
export function updateRole(id, RoleName, Description) {
  const url = `${BASE_URL}${API}${ROLE}/${UPDATES}/${id}`;
  const data = {
    id: id,
    RoleName: RoleName,
    Description: Description
  };
  const headers = {
    'Content-Type': 'application/json',
  };
  return Api(url, 'PUT', data, headers)
}

// DELETE ROLE
export function deleteRole(id) {
  var url = `${BASE_URL}${API}${ROLE}/${id}`;
  var data = {
    id: id,
  }
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  return Api(url, 'DELETE', data, headers);
}

//UPDATE TP STATUS  
export function updateTPStatus(id, TrainingPlan, status) {
  const url = `${BASE_URL}${API}${ROLE}/${UPDATES}/${id}`;
  const data = {
    id: id,
    TrainingPlan: TrainingPlan,
    status: status
  };
  const headers = {
    'Content-Type': 'application/json',
  };
  return Api(url, 'PUT', data, headers)
}

//UPDATE Assign TP to user  
export function AssignTPtoUser(id, TrainingPlanId, StatusTP) {
  const url = `${BASE_URL}${API}${TRAININGPLAN}${UPDATESTATUSTP}/${id}`;
  const data = {
    TrainingPlanId: TrainingPlanId,
    StatusTP: StatusTP,
  };
  const headers = {
    'Content-Type': 'application/json',
  };
  return Api(url, 'PUT', [data], headers)
}
