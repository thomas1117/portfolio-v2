from wagtail.core.blocks import (
    RichTextBlock, RawHTMLBlock, StructBlock, ChoiceBlock, StreamBlock
)

from wagtail.images.blocks import ImageChooserBlock
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel

class ImageBlock(StructBlock):
    image = ImageChooserBlock()
    caption = RichTextBlock(max_length=255, required=False)

    panels = [
        ImageChooserPanel('image'),
        FieldPanel('caption'),
    ]

class CodeBlock(StructBlock):
    language_choices = [
        ('javascript', 'Javascript'),
        ('python', 'Python'),
        ('html', 'HTML'),
        ('css', 'CSS'),
        ('c', 'C')
    ]
    language = ChoiceBlock(choices=language_choices)
    code = RawHTMLBlock()

class GeneralBlock(StreamBlock):
    content = RichTextBlock(icon="pilcrow")
    image = ImageBlock(icon='image')
    code = CodeBlock(icon='code')