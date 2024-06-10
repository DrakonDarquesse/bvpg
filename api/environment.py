from jinja2 import Environment

# Configure Jinja2 environment with custom delimiters
env = Environment(
    block_start_string='<=',
    block_end_string='=>',
    variable_start_string='@',
    variable_end_string='@'
)
