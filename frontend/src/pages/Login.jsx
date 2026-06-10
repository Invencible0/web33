import { useState } from "react";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({ text: "", color: "", score: 0 });

  // CAPTCHA
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, resultado: 0, input: "" });
  
  const generarCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptcha({
      num1: num1,
      num2: num2,
      resultado: num1 + num2,
      input: ""
    });
  };

  // Validar formato de email
  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const checkPasswordStrength = (pass) => {
    let score = 0;
    let text = "";
    let color = "";

    if (pass.length >= 6) score++;
    if (pass.length >= 10) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (pass.length === 0) {
      text = "";
      color = "";
    } else if (score <= 2) {
      text = "Contraseña debil";
      color = "#e74c3c";
    } else if (score === 3 || score === 4) {
      text = "Contraseña media";
      color = "#f39c12";
    } else {
      text = "Contraseña fuerte";
      color = "#27ae60";
    }

    setPasswordStrength({ text, color, score });
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  const registrar = async () => {
    if (!nombre || !email || !password || !confirmPassword) {
      setMsg("Complete todos los campos");
      return;
    }
    
    // Validar email
    if (!validarEmail(email)) {
      setMsg("Ingrese un email valido (debe contener @ y un dominio)");
      return;
    }
    
    if (password.length < 6) {
      setMsg("La contraseña debe tener minimo 6 caracteres");
      return;
    }
    
    if (password !== confirmPassword) {
      setMsg("Las contraseñas no coinciden");
      return;
    }
    
    if (passwordStrength.score < 2) {
      setMsg("La contraseña es demasiado debil. Use mas caracteres, mayusculas o numeros");
      return;
    }

    // Validar CAPTCHA en registro
    if (parseInt(captcha.input) !== captcha.resultado) {
      setMsg("CAPTCHA incorrecto");
      generarCaptcha();
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password })
      });
      
      const data = await res.json();
      setMsg(data.mensaje);
      
      if (res.ok) {
        setTimeout(() => setIsLogin(true), 1500);
        setNombre("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        generarCaptcha();
      }
    } catch (error) {
      setMsg("Error de conexion");
    }
  };

  const iniciarSesion = async () => {
    if (!email || !password) {
      setMsg("Complete todos los campos");
      return;
    }
    
    // Validar email
    if (!validarEmail(email)) {
      setMsg("Ingrese un email valido (debe contener @ y un dominio)");
      return;
    }

    // Validar CAPTCHA en login
    if (parseInt(captcha.input) !== captcha.resultado) {
      setMsg("CAPTCHA incorrecto");
      generarCaptcha();
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      setMsg(data.mensaje);
      
      if (res.ok) {
        localStorage.setItem("usuario", data.usuario);
        localStorage.setItem("rol", data.rol);
        localStorage.setItem("email", data.email);

        // Registrar log de ingreso
        const logData = {
          usuario_email: data.email,
          ip: window.location.hostname,
          evento: "ingreso",
          browser: navigator.userAgent,
          fecha: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };
        
        try {
          await fetch("http://localhost:3001/api/logs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(logData)
          });
          console.log("Log de ingreso registrado");
        } catch (logError) {
          console.error("Error al registrar log:", logError);
        }

        window.location.href = "/catalogo";
      }
    } catch (error) {
      setMsg("Error de conexion");
    }
  };

  // Generar CAPTCHA al cargar el componente
  useState(() => {
    generarCaptcha();
  }, []);

  return (
    <div className="loginContainer">
      <div className="loginBox">
        <h1>{isLogin ? "Iniciar Sesion" : "Registro"}</h1>
        
        {msg && <div className="errorMsg">{msg}</div>}
        
        {!isLogin && (
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        )}
        
        <input
          type="email"
          placeholder="Correo electronico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <div className="passwordWrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={handlePasswordChange}
          />
          <span 
            className="eyeIcon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "◉" : "○"}
          </span>
        </div>
        
        {!isLogin && password && (
          <div className="strengthContainer">
            <span style={{ color: passwordStrength.color }}>{passwordStrength.text}</span>
            <div className="strengthBar">
              <div 
                className="strengthFill"
                style={{ 
                  width: `${(passwordStrength.score / 5) * 100}%`,
                  background: passwordStrength.color
                }}
              />
            </div>
          </div>
        )}
        
        {!isLogin && (
          <div className="passwordWrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span 
              className="eyeIcon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "◉" : "○"}
            </span>
          </div>
        )}

        {/* CAPTCHA */}
        <div className="captchaContainer">
          <div className="captchaPregunta">
            <span>{captcha.num1} + {captcha.num2} = ?</span>
          </div>
          <input
            type="number"
            placeholder="Resultado"
            value={captcha.input}
            onChange={(e) => setCaptcha({ ...captcha, input: e.target.value })}
            className="captchaInput"
          />
          <button type="button" onClick={generarCaptcha} className="captchaRefresh">
            Actualizar
          </button>
        </div>
        
        <button onClick={isLogin ? iniciarSesion : registrar}>
          {isLogin ? "Entrar" : "Registrarse"}
        </button>
        
        <button className="switchBtn" onClick={() => {
          setIsLogin(!isLogin);
          setMsg("");
          setPassword("");
          setConfirmPassword("");
          generarCaptcha();
        }}>
          {isLogin ? "Crear cuenta nueva" : "Ya tengo cuenta"}
        </button>
      </div>
    </div>
  );
}

export default Login;
