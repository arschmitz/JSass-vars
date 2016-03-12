(function ( root, factory ) {
    if ( typeof define === "function" && define.amd ) {
        define( [], factory );
    } else if ( typeof exports === "object" ) {
        module.exports = factory();
    } else {
        root.sassvars = factory();
  }
}( this, function () {
return {
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
    }
};
} ) );
