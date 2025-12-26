import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../utils/api";
import { InputField } from "../components/inputField";
import { InputCheckbox } from "../components/inputcheckbox";
import { ButtonSubmit } from "../components/button";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import loginPicture from "../assets/loginPicture/LoginRegisterPicture4.png";
import googleLogo from "../assets/loginPicture/googleLogo.svg";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await authAPI.login(email, password);
            navigate("/dashboard");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 403) {
                alert("กรุณายืนยันอีเมลก่อนเข้าสู่ระบบ");
            } else {
                alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        // redirect ไป server (passport google)
        // window.location.href = "http://localhost:3000/api/auth/google";
        navigate("/register", {
            state: { isRegisterWithGoogle: true },
        })
    };

    return (
        <Container fluid>
            <Row style={{ display: "flex", width: "100%" }}>
                <Col sm={4} style={{ padding: 0}}>
                    <img src={loginPicture} alt="Login" style={{ maxWidth: "100%", height: "auto" }} />
                </Col>
                <Col sm={8} style={{ display: "flex", justifyContent:"end"}}>
                    <div style={{ width: "100%", justifyItems: "center", alignItems: "center", margin: "20%" }}>
                        <h4>เข้าสู่ระบบ</h4>
                        <InputField label="อีเมลผู้ใช้งาน" placeholder="example@gmail.com" type="email" />
                        <InputField label="รหัสผ่าน" type="password" />
                        <InputCheckbox label="จำไว้ใช้คราวหน้า" />
                        <ButtonSubmit type="submit" textButton="เข้าสู่ระบบ" style={{ backgroundColor: "#FBBC05", width: "100%", border: "0px", color: "black", fontWeight: "bold", margin: "2% 0" }} />
                        <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
                            <a href="" style={{ color: "black", textDecoration: "none", fontWeight: "normal", margin: "0 0 5% 0" }}>
                                ลืมรหัสผ่าน?
                            </a>
                        </div>
                        <div style={{ display: "flex", width: "100%", gap: "16px", alignItems: "center" }}>
                            <div style={{ backgroundColor: "black", height: "1px", width: "100%" }}></div>
                            <p style={{ textAlign: "center", margin: "0px" }}>หรือ</p>
                            <div style={{ backgroundColor: "black", height: "1px", width: "100%" }}></div>
                        </div>
                        <br />
                        <button
                            onClick={handleGoogleLogin}
                            style={{
                                width: "100%",
                                height: "36px",
                                backgroundColor: "white",
                                border: "1px solid #e0e0e0",
                                borderRadius: "4px",
                                padding: "10px",
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                justifyContent: "center",
                                margin: "0 0 4% 0",
                            }}
                        >
                            <img src={googleLogo} alt="Google" style={{ width: "20px" }} />
                            <span>เข้าสู่ระบบด้วย Google</span>
                        </button>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            {/* <a href="./Register.tsx" style={{ color: "black", textDecoration: "none", margin: "0 0 5% 0" }}>
                                สมัครสมาชิก
                            </a> */}
                            <button
                                onClick={() =>
                                    navigate("/register", {
                                        state: { isRegisterWithGoogle: false },
                                    })
                                }
                                style={{ background: "none", border: "none", cursor: "pointer" }}
                            >
                                สมัครสมาชิก
                            </button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
