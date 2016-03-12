(function ( root, factory ) {
    if ( typeof define === "function" && define.amd ) {
        define( [], factory );
    } else if ( typeof exports === "object" ) {
        module.exports = factory();
    } else {
        root.warming = factory();
  }
}( this, function () {
return {
    "breakpoints": {
        "viewport-sm-min": {
            "name": "Viewport Breakpoint - Small Minimum Width",
            "value": "400px"
        },
        "viewport-md-min": {
            "name": "Viewport Breakpoint - Medium Minimum Width",
            "value": "768px"
        },
        "viewport-lg-min": {
            "name": "Viewport Breakpoint - Large Minimum Width",
            "value": "920px"
        },
        "viewport-xl-min": {
            "name": "Viewport - Extra Large Minimum Width",
            "value": "1200px"
        }
    },
    "colors": {
        "default": {
            "name": "Default Colors",
            "value": {
                "base": "#F5F5F5",
                "light": "#FFFFFF",
                "dark": "#EEEEEE",
                "darker": "#E0E0E0"
            }
        },
        "primary": {
            "name": "Primary Colors",
            "value": {
                "base": "#3F51B5",
                "light": "#5C6BC0",
                "dark": "#3949AB",
                "darker": "#303F9F"
            }
        },
        "success": {
            "name": "Success Colors",
            "value": {
                "base": "#43A047",
                "light": "#4CAF50",
                "dark": "#388E3C",
                "darker": "#2E7D32"
            }
        },
        "warning": {
            "name": "Warning Colors",
            "value": {
                "base": "#FF5722",
                "light": "#FF7043",
                "dark": "#F4511E",
                "darker": "#E64A19"
            }
        },
        "info": {
            "name": "Info Colors",
            "value": {
                "base": "#039BE5",
                "light": "#03A9F4",
                "dark": "#0288D1",
                "darker": "#0277BD"
            }
        },
        "error": {
            "name": "Error Colors",
            "value": {
                "base": "#F44336",
                "light": "#EF5350",
                "dark": "#E53935",
                "darker": "#D32F2F"
            }
        },
        "text": {
            "name": "Text Colors",
            "value": {
                "base": "#212121",
                "light": "#727272"
            }
        },
        "background": {
            "name": "Background Colors",
            "value": {
                "base": "#fff"
            }
        }
    },
    "typography": {
        "normal": {
            "name": "Font weight - Normal",
            "value": "normal"
        },
        "bold": {
            "name": "Font weight - Bold",
            "value": "bold"
        },
        "color": {
            "name": "Font color",
            "value": "#222"
        },
        "fontSize": {
            "name": "Font size",
            "value": "20px"
        },
        "lineHeight": {
            "name": "Line Height",
            "value": 1.5
        },
        "defaultFont": {
            "name": "Type Style - Default",
            "value": {
                "color": "#222",
                "font-size": "20px",
                "line-height": 1.5
            }
        },
        "monospace": {
            "name": "Font Family - Monospace",
            "value": "\"courier new\", monospace"
        },
        "serif": {
            "name": "Font Family - Serif",
            "value": "Georgia, \"Times New Roman\", Times, serif"
        },
        "sans": {
            "name": "Font Family - Sans",
            "value": "Helvetica, Arial, sans-serif"
        }
    },
    "btn": {
        "shadows": {
            "name": "Button Shadow Styles",
            "value": {
                "transition": "box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                "box-shadow-base": "0 2px 5px 0 rgba(0,0,0,.26)",
                "box-shadow-active": "0 3px 10px 0 rgba(0,0,0,.2)",
                "box-shadow-disabled": "0 0 0 rgba(0,0,0,0)"
            }
        },
        "btn": {
            "name": "Generic Button Styles",
            "value": {
                "font-weight": 500,
                "margin": ".25em",
                "text-transform": "uppercase",
                "letter-spacing": "1px"
            }
        },
        "font": {
            "name": "Button Font",
            "value": "$sans"
        },
        "default": {
            "name": "Default Button",
            "value": {
                "color": "#212121",
                "background": "$default",
                "border": "transparent",
                "shadow": "true"
            }
        },
        "primary": {
            "name": "Primary Button",
            "value": {
                "color": "#ffffff",
                "background": "$primary",
                "border": "transparent",
                "shadow": "true"
            }
        },
        "success": {
            "name": "Success Button",
            "value": {
                "color": "#ffffff",
                "background": "$success",
                "border": "transparent",
                "shadow": "true"
            }
        },
        "info": {
            "name": "Info Button",
            "value": {
                "color": "#ffffff",
                "background": "$info",
                "border": "transparent",
                "shadow": "true"
            }
        },
        "warning": {
            "name": "Warning Button",
            "value": {
                "color": "#ffffff",
                "background": "$warning",
                "border": "transparent",
                "shadow": "true"
            }
        },
        "danger": {
            "name": "Danger Button",
            "value": {
                "color": "#ffffff",
                "background": "$error",
                "border": "transparent",
                "shadow": "true"
            }
        },
        "disabled": {
            "name": "Disabled Button",
            "value": {
                "opacity": ".6"
            }
        },
        "lg": {
            "name": "Large Button",
            "value": {
                "border-radius": "2px",
                "font-size": "16px",
                "line-height": "16px",
                "padding": ".75em 1.25em"
            }
        },
        "md": {
            "name": "Medium Sized Button",
            "value": {
                "border-radius": "2px",
                "font-size": "14px",
                "line-height": "14px",
                "padding": ".5em 1em"
            }
        },
        "sm": {
            "name": "Small Button",
            "value": {
                "border-radius": "2px",
                "font-size": "12px",
                "line-height": "12px",
                "padding": ".45em .75em"
            }
        },
        "xs": {
            "name": "Extra Small Button",
            "value": {
                "border-radius": "2px",
                "font-size": "12px",
                "line-height": "12px",
                "padding": ".35em"
            }
        }
    }
};
} ) );
