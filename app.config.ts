export default defineAppConfig({
    ui: {
        colors: {
            primary: "red",
            neutral: "light",
        },
        button: {
            slots: {
                base: ["cursor-pointer"],
            },
            compoundVariants: [
                {
                    color: "primary",
                    variant: "solid",
                    class: "text-light-50",
                },
            ],
        },
    }
})
