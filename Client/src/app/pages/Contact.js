
import React from "react";
import axios from "axios";
import Swal from 'sweetalert2'

class Contact extends React.Component {
      userrr = JSON.parse(localStorage.getItem('user'));

    constructor(props) {
        super(props);
        this.state = {
          name: this.userrr.firstname+""+this.userrr.lastname,
          email: this.userrr.email,
          subject:'',
          message: ''
        }
    } 
    onNameChange(event) {
        this.setState({name: event.target.value})
    }

    onEmailChange(event) {
        this.setState({email: event.target.value})
    }

    onSubjectChange(event) {
        this.setState({subject: event.target.value})
    }

    onMsgChange(event) {
        this.setState({message: event.target.value})
    }
    submitEmail(e){
        e.preventDefault();
        console.log(this.state)
        axios.post(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+`/users/send`,{data:this.state}).then((response)=>{
          if (response.data.status === 'success'){
              
              Swal.fire(
                'success!',
                'Message Sent!',
                'success'
              );  
              this.resetForm()
          }else if(response.data.status === 'fail'){
            Swal.fire(
                'error!',
                'Message failed to send.!',
                'error'
              );  
              
          }
        })
}

resetForm(){
        this.setState({ name: this.userrr.firstname+""+this.userrr.lastname,
        email: this.userrr.email,subject:'', message: ''})
}
render() {
    return (
        <div className="section">
            <div className="container-fluid p-3 my-3 bg-white border-0">
                <div className="row">
                <div className="col-lg-6">
                     <div className="card-shadow">
                    <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/2.jpg" className="img-fluid"/>
                               </div>
                            </div>
                            <div className="col-lg-6">
                    <div className="col-md-12">
                        <div className="section-title">
                            <h1 className="font-weight-light mt-2">Contact Us</h1>
                            <p>Let us know what you think! In order to provide better service,
                                 please do not hesitate to give us your feedback. Thank you.</p><hr/>
                            <form id="contact-form" onSubmit={this.submitEmail.bind(this)} 
                                method="POST">
                            <div className="form-group">
                            <div className="row">
                            <div className="col-md-6">
                                <input placeholder = "Name"  disabled id="name" type="text" 
                                   className="form-control" required value={this.state.name} 
                                   onChange={this.onNameChange.bind(this)}/>
                            </div>
                            <div className="col-md-6">
                                <input placeholder = "Email" disabled id="email" type="email"
                                  className="form-control" aria-describedby="emailHelp"
                                  required value={this.state.email} onChange=
                                  {this.onEmailChange.bind(this)}/>
                            </div>
                            </div>
                            </div>
                            <div className="form-group">
                                <input placeholder = "Subject"  id="subject" type="text"
                                  className="form-control" required value={this.state.subject}
                                  onChange={this.onSubjectChange.bind(this)}/>
                            </div>
                            <div className="form-group">
                                <textarea placeholder = "Message"  id="message" 
                                   className="form-control" rows="1" 
                                   required value={this.state.message}
                                   onChange= {this.onMsgChange.bind(this)}/>
                            </div>
                            <button type="submit" className={`btn btn-danger mt-3  border-0 px-3 py-2`}><span> SUBMIT</span></button>
                            </form>
                        </div>
                    </div>
</div>
                </div>

            </div>
            <div className="col-lg-12">
          <div className="card mt-4 border-0 mb-4">
            <div className="row">
              <div className="col-lg-4 col-md-4">
                <div className="card-body d-flex align-items-center c-detail pl-0">
                  <div className="mr-3 align-self-center">
                    <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon1.png"/>
                  </div>
                  <div className="">
                    <h6 className="font-weight-medium">Address</h6>
                    <p className="">1, 2 rue André Ampère - 2083 - Pôle
                      <br/> Technologique - El Ghazala.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="card-body d-flex align-items-center c-detail">
                  <div className="mr-3 align-self-center">
                    <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon2.png"/>
                  </div>
                  <div className="">
                    <h6 className="font-weight-medium">Phone</h6>
                    <p className="">+216 25913084
                      <br/> +216 28607679</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="card-body d-flex align-items-center c-detail">
                  <div className="mr-3 align-self-center">
                    <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon3.png"/>
                  </div>
                  <div className="">
                    <h6 className="font-weight-medium">Email</h6>
                    <p className="">
                    edutopiaa@gmail.com
                      <br/> meetopiaa@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
 
        
    );
}

}
export default Contact
