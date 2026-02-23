export default function Navbar() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "80px",
        background: "#f5efe8",
        borderBottom: "1px solid #e5ddd5",
        display: "flex",
        alignItems: "center",
        zIndex: 1000
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px"
        }}
      >
        {/* LEFT MENU */}
        <nav
          style={{
            display: "flex",
            gap: "25px",
            flex: 1
          }}
        >
          <a href="#" style={linkStyle}>Home</a>
          <a href="#" style={linkStyle}>Shop</a>
          <a href="#" style={linkStyle}>About</a>
          <a href="#" style={linkStyle}>Contact</a>
        </nav>

        {/* CENTER LOGO */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center"
          }}
        >
          <img
            src="/logo.png"
            alt="Logo"
            style={{
              height: "85px",
              objectFit: "contain"
            }}
          />
        </div>

        {/* RIGHT SIDE */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "18px"
          }}
        >
          {/* SEARCH BAR */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "white",
              borderRadius: "20px",
              padding: "6px 12px",
              border: "1px solid #ddd"
            }}
          >
            <input
              type="text"
              placeholder="Search"
              style={{
                border: "none",
                outline: "none",
                fontSize: "14px",
                width: "130px"
              }}
            />
            <span style={{ marginLeft: "6px", cursor: "pointer" }}>
              🔍
            </span>
          </div>

          {/* PHONE */}
          <span
            style={{
              fontSize: "14px",
              whiteSpace: "nowrap"
            }}
          >
            📞 +91 9876543210
          </span>

          {/* PROFILE */}
          <span
            style={{
              fontSize: "18px",
              cursor: "pointer"
            }}
          >
            👤
          </span>

          {/* WISHLIST */}
          <span
            style={{
              fontSize: "18px",
              cursor: "pointer"
            }}
          >
            ❤️
          </span>

          {/* CART */}
          <span
            style={{
              fontSize: "20px",
              cursor: "pointer"
            }}
          >
            🛒
          </span>
        </div>
      </div>
    </header>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "#3e2c23",
  fontWeight: "500",
  fontSize: "15px"
};