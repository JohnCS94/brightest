unit_conversion = {
    'kWh': 1,
    'MWh': 1000,  
    'GJ': 277.777778 
}

def normalize_quantity(quantity, unit):
    if unit in unit_conversion:
        return quantity * unit_conversion[unit]
    else:
        raise ValueError(f"Unsupported unit: {unit}")