/* empty css                          */
import { e as createComponent, r as renderTemplate, g as renderComponent, u as unescapeHTML } from '../astro_nnZpuxeB.mjs';
import { $ as $$Article } from './banana-is-the-best-meal-packages-in-the-UK-spark-outrage-online_CtWy8vFy.mjs';

const html = "<p>Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blandit euismod.</p>\n<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo vel ad consectetur ut aperiam. Itaque eligendi natus aperiam? Excepturi repellendus consequatur quibusdam optio expedita praesentium est adipisci dolorem ut eius!</p>\n<h2 id=\"creative-design\">Creative Design</h2>\n<p>Nam ut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blandit euismod.</p>\n<blockquote>\n<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo vel ad consectetur ut aperiam. Itaque eligendi natus aperiam? Excepturi repellendus consequatur quibusdam optio expedita praesentium est adipisci dolorem ut eius!</p>\n</blockquote>\n<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo vel ad consectetur ut aperiam. Itaque eligendi natus aperiam? Excepturi repellendus consequatur quibusdam optio expedita praesentium est adipisci dolorem ut eius!</p>";

				const frontmatter = {"title":"Become a morning person with the help of alarm clock","layout":"../../layouts/Article.astro","image":"/images/03.webp","excerpt":"Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blandit euismod.","author":"Mark Dinn","created_at":"04 Apr, 2022","category":"Accessories"};
				const file = "/Users/albert/Sites/curso-astro-2024/src/pages/blog/become-a-morning-person-with-the-help-of-alarm-clock.md";
				const url = "/blog/become-a-morning-person-with-the-help-of-alarm-clock";
				function rawContent() {
					return "\nNemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blandit euismod.\n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Nemo vel ad consectetur ut aperiam. Itaque eligendi natus aperiam? Excepturi repellendus consequatur quibusdam optio expedita praesentium est adipisci dolorem ut eius!\n\n## Creative Design\n\nNam ut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blandit euismod.\n\n> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo vel ad consectetur ut aperiam. Itaque eligendi natus aperiam? Excepturi repellendus consequatur quibusdam optio expedita praesentium est adipisci dolorem ut eius!\n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Nemo vel ad consectetur ut aperiam. Itaque eligendi natus aperiam? Excepturi repellendus consequatur quibusdam optio expedita praesentium est adipisci dolorem ut eius!\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"creative-design","text":"Creative Design"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${renderComponent(result, 'Layout', $$Article, {
								file,
								url,
								content,
								frontmatter: content,
								headings: getHeadings(),
								rawContent,
								compiledContent,
								'server:root': true,
							}, {
								'default': () => renderTemplate`${unescapeHTML(html)}`
							})}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
