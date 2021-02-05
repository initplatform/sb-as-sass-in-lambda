import type { HttpFunction } from '@google-cloud/functions-framework/build/src/functions';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import { renderSync } from 'sass';

const entryPoint = `/*!
* Start Bootstrap - Material Admin Pro Styles
* Copyright 2013-2021 Start Bootstrap LLC
* Licensed under SEE_LICENSE at https://startbootstrap.com/licenses
*/
@import "./scss/styles.scss"
`;
export const compileSass: HttpFunction = async (req, res) => {
    const results = renderSync({
        data: entryPoint,
        includePaths: ['./external', './overrides'],
        importer: (url, prev, done) => {
            if (url === 'as-sass-in-color-overrides.scss') {
                let contents = '';
                if (req.body.primary) {
                    contents += `$primary: ${req.body.primary};\n`;
                }
                if (req.body.secondary) {
                    contents += `$secondary: ${req.body.secondary};\n`;
                }
                if (req.body.success) {
                    contents += `$success: ${req.body.success};\n`;
                }
                if (req.body.danger) {
                    contents += `$danger: ${req.body.danger};\n`;
                }
                if (req.body.warning) {
                    contents += `$warning: ${req.body.warning};\n`;
                }
                if (req.body.info) {
                    contents += `$info: ${req.body.info};\n`;
                }
                console.log(contents);

                return {
                    file: '',
                    contents,
                };
            }
        },
    });

    postcss([autoprefixer])
        .process(results.css, { from: 'styles.css', to: 'styles.css' })
        .then(result => {
            result.warnings().forEach(warn => {
                console.warn(warn.toString());
            });
            res.send(result.css.toString());
        });
};
