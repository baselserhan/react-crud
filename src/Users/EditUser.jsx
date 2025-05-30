import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialUserInfo = {
  id: "",
  name: "",
  username: "",
  email: "",
  phone: "",
  website: "",
  address: {
    city: "",
    street: "",
    suite: "",
    zipcode: "",
  },
  company: {
    name: "",
    catchPhrase: "",
    bs: "",
  },
};

const EditUser = (props) => {
  const [userInfo, setUserInfo] = useState(initialUserInfo);

  useEffect(() => {
    setUserInfo({ ...userInfo, id: props.userId });
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/users/" + props.userId
      );
      if (response) {
        setUserInfo(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const editExistUser = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/users/" + props.userId,
        userInfo
      );
      if (response) {
        console.log(response.data);
        props.setUserEdited();
        toast.success("User updated successfully");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="user-view _add-view">
      <h1>Basic Info</h1>
      <div className="box">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Full Name:</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Full Name"
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.target.value })
                }
              />
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Username:</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Username"
                value={userInfo.username}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, username: e.target.value })
                }
              />
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Email Address:</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Email Address"
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
              />
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Phone Number:</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Phone Number"
                value={userInfo.phone}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, phone: e.target.value })
                }
              />
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Website:</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Website"
                value={userInfo.website}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, website: e.target.value })
                }
              />
            </p>
          </div>
        </div>
      </div>

      <h1>User Address</h1>
      <div className="box">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <p>
              <span>City:</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter City Name"
                value={userInfo.address.city}
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    address: { ...userInfo.address, city: e.target.value },
                  })
                }
              />
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Street:</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Street Name"
                value={userInfo.address.street}
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    address: { ...userInfo.address, street: e.target.value },
                  })
                }
              />
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Suite:</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Suite Name"
                value={userInfo.address.suite}
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    address: { ...userInfo.address, suite: e.target.value },
                  })
                }
              />
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>ZIP Code:</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter ZIP Code"
                value={userInfo.address.zipcode}
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    address: { ...userInfo.address, zipcode: e.target.value },
                  })
                }
              />
            </p>
          </div>
        </div>
      </div>

      <h1>User Company</h1>
      <div className="box">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Name:</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Company Name"
                value={userInfo.company.name}
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    company: { ...userInfo.company, name: e.target.value },
                  })
                }
              />
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Catch Phrase:</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Catch Phrase"
                value={userInfo.company.catchPhrase}
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    company: {
                      ...userInfo.company,
                      catchPhrase: e.target.value,
                    },
                  })
                }
              />
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>BS:</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter BS"
                value={userInfo.company.bs}
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    company: { ...userInfo.company, bs: e.target.value },
                  })
                }
              />
            </p>
          </div>
        </div>
      </div>

      <button className="btn btn-success" onClick={() => editExistUser()}>
        Update User
      </button>
    </div>
  );
};

export default EditUser;
