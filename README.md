# jinja-spacer README

"jinja-spacer" is a Visual Code Extension that automatically adds spaces to jinja expressions for better code readability when saving the file

## Features

The extension automatically adds blank spaces between {{ }} and {% %} jinja declarations on save. It works with jinja, sql and yml/yaml files extensions. For example, if we have the following expression in a .sql file:

select * from {%ref('stg_customers')%}

when saving the file, the extension will automatically change the expression to:

select * from {% ref('stg_customers') %}