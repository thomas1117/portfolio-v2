from django import template
from django.utils.safestring import mark_safe
import os, json

register = template.Library()

def load_data():
    base = 'base/static/dist/manifest.json'
    manifest = os.path.isfile(base)

    if manifest:
        pointer = open(base)
        manifest_data = json.load(pointer)
        return manifest_data
    else:
        return False

def file_path_exists(path, extension):
    data = load_data()

    if data and data.get(extension):
        return data[extension].get(path, False);
    else:
        return False

@register.simple_tag
def bundle(bundle_name, extension='js', config='DEFAULT', attrs=''):
    val = file_path_exists(bundle_name, extension)

    if val and extension == 'js':
        return mark_safe('<script src="%s"></script>' % val)
    elif val and extension == 'css':
        return mark_safe('<link href="%s" />' % val)
    else:
        return ''