/** Decorative iOS status bar from the Figma frame. Not interactive. */
export function StatusBar() {
  return (
    <div
      aria-hidden="true"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 39,
        paddingLeft: 44,
        paddingRight: 32,
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <span
          style={{
            fontSize: 17,
            fontWeight: 590,
            letterSpacing: "-0.5px",
            color: "#36373e",
            lineHeight: "14px",
          }}
        >
          9:41
        </span>
        <img src="/food/location.svg" width={14} height={14} alt="" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <img src="/food/signal.svg" width={20} height={14} alt="" />
        <img src="/food/data.svg" width={19.2612} height={14} alt="" />
        <span style={{ position: "relative", width: 27, height: 14, display: "block" }}>
          <img src="/food/battery.svg" width={27} height={14} alt="" />
          <img
            src="/food/battery-fill.svg"
            width={9.87925}
            height={14}
            alt=""
            style={{ position: "absolute", left: 0, top: 0 }}
          />
          <span
            style={{
              position: "absolute",
              left: 4,
              top: 0,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "-0.5px",
              color: "#36373e",
              lineHeight: "14px",
            }}
          >
            32
          </span>
        </span>
      </div>
    </div>
  );
}
