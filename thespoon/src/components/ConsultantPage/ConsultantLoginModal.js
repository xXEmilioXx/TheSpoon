//<editor-fold desc="React">
import React, {Component} from "react";
//</editor-fold>
//<editor-fold desc="RxJs">


import {of, bindCallback, throwError} from "rxjs";
import {ajax} from "rxjs/ajax";
import {map, exhaustMap, take, catchError} from "rxjs/operators";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
//</editor-fold>
//<editor-fold desc="Bootstrap">
import {Modal} from "react-bootstrap";
//</editor-fold>
//<editor-fold desc="Validator">
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Button from "react-validation/build/button";
import FormValidator from "../../validation/FormValidator";
//</editor-fold>

//<editor-fold desc="Constants">
import {roles} from "../../constants/Roles"
import {paths} from "../../constants/Paths";
import {modals} from "../../constants/Modals";
import {timeouts} from "../../constants/Timeouts"
//</editor-fold>
//<editor-fold desc="Containers">
import FilterLink from "../../containers/FilterModalLink";
//</editor-fold>
//<editor-fold desc="Icons">
import {IconExit, IconName, IconPassword} from "../Icons";

//</editor-fold>


class ConsultantLoginModal extends Component {

    //<editor-fold desc="Constructor">
    constructor(props) {
        super(props);

        //<editor-fold desc="Validator">
        this.validator = new FormValidator([{
            field: "username",
            method: "isEmpty",
            validWhen: false,
            message: "Username is required."
        }, {
            field: "password",
            method: "isEmpty",
            validWhen: false,
            message: "Password is required."
        }]);

        //</editor-fold>

        //<editor-fold desc="Handler Function Registration">
        this.handleSubmit = this.handleSubmit.bind(this);

        //</editor-fold>

        this.state = {
            token: window.localStorage.getItem("token"),
            validation: this.validator.valid(),
            serverMessage: "",
            submitted: false,
            //<editor-fold desc="Login States">
            username: "",
            password: ""

            //</editor-fold>
        };
    }

    //</editor-fold>

    //<editor-fold desc="Business Logic">
    handleSubmit = (event) => {
        event.preventDefault();

        const thisTemp = this;
        of(1)
            .pipe(map(() => {
                return thisTemp.form.getValues();
            }), catchError((error) => {
                return throwError(error);
            }))
            .pipe(exhaustMap((values) => {
                return bindCallback(thisTemp.setState).call(thisTemp, {
                    username: values.username,
                    password: values.password
                });
            }), catchError((error) => {
                return throwError(error);
            }))
            .pipe(exhaustMap(() => {
                return bindCallback(thisTemp.setState).call(thisTemp, {
                    validation: thisTemp.validator.validate(thisTemp.state),
                    submitted: true,
                    serverMessage: ""
                });
            }), catchError((error) => {
                return throwError(error);
            }))
            .pipe(exhaustMap(() => {
                if (thisTemp.state.validation.isValid) {
                    thisTemp.setState({serverMessage: "Login is processing"});
                    return ajax({
                        url: paths["restApi"]["loginConsultant"],
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: {
                            username: thisTemp.state.username,
                            password: thisTemp.state.password,
                        },
                        timeout: timeouts,
                        responseType: "text"
                    })
                } else {
                    return throwError({
                        name: "InternalError",
                        status: -1,
                        response: null
                    });
                }
            }), catchError((error) => {
                return throwError(error);
            }))
            .pipe(take(1))
            .subscribe(
                (next) => {
                    let response = JSON.parse(next.response);
                    window.localStorage.setItem("token", response.token);
                    window.localStorage.setItem("user", roles["CONSULTANT"]);
                    thisTemp.props._backgroundPage.update();
                    thisTemp.props.onHide();
                }, (error) => {
                    switch (error.name) {
                        case "AjaxTimeoutError":
                            thisTemp.setState({serverMessage: "The request timed out."});
                            break;
                        case "InternalError":
                        case "AjaxError":
                            if (error.status === 0 && error.response === "") {
                                thisTemp.setState({serverMessage: "There is no connection to the server."});
                            } else {
                                thisTemp.setState({serverMessage: error.response});
                            }
                            break;
                        default:
                            console.log(error);
                            thisTemp.setState({serverMessage: "Something is not like it is supposed to be."});
                            break;
                    }
                }
            );
    };
    //</editor-fold>

    //<editor-fold desc="Render">
    render() {
        let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation;
        if (this.props._backgroundPage == null) {
            // noinspection JSLint
            return (<p>Something went wrong.</p>);
        } else if (this.state.token == null || this.state.token === "null") {
            //<editor-fold desc="Render No Token">
            return (
                <Modal.Body>
                    <button className="exit" onClick={this.props.onHide}><IconExit/></button>
                    <div className="modal-wrapper ">
                        <Form ref={(c) => {
                            this.form = c;
                        }} onSubmit={this.handleSubmit}>
                            <h2 className="title">
                                Log in
                            </h2>
                            <div className="account-type">
                                <h4>as a <span className="role">Consultant</span></h4>
                            </div>

                            <div className="input-field">
                                <IconName/>
                                <Input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    id="loginFormUsername"
                                    required
                                />
                            </div>
                            <div className="error-block">
                                <small>
                                    {validation.username.message}
                                </small>
                            </div>

                            <div className="input-field">
                                <IconPassword/>
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    id="loginFormPassword"
                                    required
                                />
                            </div>
                            <div className="error-block">
                                <small>{validation.password.message}</small>
                            </div>

                            <Button
                                type="submit"
                                className="normal"
                            >
                                Log in
                            </Button>
                            <div className="error-block">
                                <small>
                                    {this.state.serverMessage}
                                </small>
                            </div>
                        </Form>

                        <div className="link-wrapper">
                            <small>
                                Don't have an account?
                                <FilterLink
                                    modal={modals.SHOW_REGISTER_CONSULTANT}
                                >
                                    Register now
                                </FilterLink>
                            </small>
                        </div>
                    </div>
                </Modal.Body>
            );

            //</editor-fold>
        } else {
            return (<p>Something went wrong.</p>);
        }
    }

    //</editor-fold>

}

//<editor-fold desc="Redux">
const mapStateToProps = (state) => {
    return {
        _backgroundPage: state._backgroundPageReducer._backgroundPage
    };
};

export default connect(mapStateToProps, null)(ConsultantLoginModal);

//</editor-fold>
