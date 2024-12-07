import { ConfigProvider } from "antd";

export const AntConfigProvider = ({ children }: any) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            activeBorderColor: "var(--primary)",
            activeShadow: "0px 4px 8px rgba(255, 77, 79, 0.2)",
            hoverBorderColor: "var(--primary)",
            inputFontSize: 14,
            paddingBlock: 10,
            paddingInline: 10,
          },
          Slider: {
            handleColor: "var(--primary)",
            trackHoverBg: "var(--primary)",
            trackBg: "var(--primary)",
            handleActiveColor: "var(--primary)",
            handleActiveOutlineColor: "0px 4px 8px rgba(255, 77, 79, 0.2)",
            handleColorDisabled: "var(--primary)",
          },
          Button: {
            defaultBorderColor: "#d9d9d9",
            defaultActiveBorderColor: "var(--primary)",
            defaultActiveColor: "var(--primary)",
            defaultHoverBorderColor: "var(--primary)",
            defaultHoverColor: "var(--primary)",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
